import { container } from "../../container";
import { OfferService } from "../../models/services/OfferService";
import { PlatformService } from "../../models/services/PlatformService";
import fs from "fs";
import { Offer, PlatformSource } from "../../models";
import { QueryPlatform } from "../../resources";
import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";


export class ParseFiverr {

    private name: string;
    private offerService: OfferService;
    private platformService: PlatformService;
    private context: { base: string, values: Array<{ key: string, link: string }> };
    private uniqList: Array<String>;

    constructor() {
        this.name = "Fiverr";
        this.offerService = container.resolve('offerService');
        this.platformService = container.resolve('platformService');
        this.context = JSON.parse(fs.readFileSync(`${__dirname}/assets/merge.json`, {
            encoding: "utf8"
        }));
        this.uniqList = [];
    }

    async bootstrap() {
        const plt = await this.platformService.findByName(this.name);

        if (!plt) {
            const kicklox = new PlatformSource();

            kicklox.name = this.name;
            kicklox.link = "https://www.fiverr.com/";
            await this.platformService.insert(kicklox);
        }
    }

    async eachPage(plt: PlatformSource, uri: string) {
        const url = `${plt.link}${uri}`;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36");
        page.setJavaScriptEnabled(true);
        page.setExtraHTTPHeaders({
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1"
        });
        const response = await page.goto(url, {
            waitUntil: "domcontentloaded"
        });
        const data = await response.text();
        const $ = cheerio.load(data);
        const offer = new Offer();

        offer.title = $("h1.text-display-3").text();
        offer.targetId = `${plt.link}${uri}`;
        offer.link = uri;
        offer.description = $(".description-content").text();
        offer.platform = plt;
        const priceTxt = $("span.price").text();
        const matches = priceTxt.match(/[0-9]+/ig);
        if (matches.length) {
            offer.price = `${matches[0]}€`;
        }
        console.log(offer);
        await this.offerService.insert(offer);
        await browser.close();
    }

    async eachQuery(plt: PlatformSource, url: string) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36");
        page.setJavaScriptEnabled(true);
        page.setExtraHTTPHeaders({
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1"
        });
        const response = await page.goto(url, {
            waitUntil: "domcontentloaded"
        });
        let data = await response.text();
        const $ = cheerio.load(data);
        const tab = $(".gig-card-layout").toArray();
        for (let item of tab) {
            const aEl = $(item).find(".media");
            const uri = `${aEl.attr("href")}`;

            if (this.uniqList.indexOf(`${plt.link}${aEl.attr("href")}`) == -1)
                await this.eachPage(plt, uri);
            this.uniqList.push(`${plt.link}${aEl.attr("href")}`);
        }
        await browser.close();
        const aEl = $("#pagination .pagination-arrows a").toArray();
        if (aEl && aEl.length) {
            const href = $(aEl[0]).attr("href");

            await this.eachQuery(plt, href);
        }
    }

    async batchUrls(plt: PlatformSource, urls: Array<string>) {
        for (let url of urls) {
            await this.eachQuery(plt, url);
        }
    }

    async run() {
        const query: QueryPlatform = {
            platformName: this.name
        };
        const plt: PlatformSource = await this.platformService.search(query);
        const fetched = await this.platformService.findOne(plt.id);
        const offers = await fetched.offers;
        this.uniqList = offers.map((o) => o.targetId);
        let keywords: Array<string> = [];
        const tasks = await plt.tasks;

        for (let task of tasks) {
            const cronTaskKeywords = await task.cronTaskKeywords;
            if (cronTaskKeywords && cronTaskKeywords.length) {
                for (let crk of cronTaskKeywords) {
                    keywords.push(crk.keyword);
                }
            }
        }
        const urls: string[] = [];
        const context = this.context.values;
        for (let keyword of keywords) {
            for (let i = 0; i < context.length; i++) {
                const c = context[i];

                if (c.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || c.link.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    urls.push(`${this.context.base}${c.link}`);
                    context.splice(i, 1);
                    i--;
                }
            }
        }
        try {
            await this.batchUrls(plt, urls);
        }
        catch (e) {
            console.log(e.message);
        }
    }
}