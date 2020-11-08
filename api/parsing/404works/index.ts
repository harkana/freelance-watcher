import { container } from "../../container";
import { Offer, PlatformSource } from "../../models";
import { OfferService } from "../../models/services/OfferService";
import { PlatformService } from "../../models/services/PlatformService";
import { QueryPlatform } from "../../resources";
import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";

export class Parse404Works {

    private name: string;
    private offerService: OfferService;
    private platformService: PlatformService;
    private context: Array<{ key: string, value: string }>;
    private uniqList: Array<String>;

    constructor() {
        this.name = "404works";
        this.offerService = container.resolve('offerService');
        this.platformService = container.resolve('platformService');
        this.context = JSON.parse(fs.readFileSync(`${__dirname}/assets/info.json`, {
            encoding: "utf8"
        }));
    }

    async bootstrap() {
        const plt = await this.platformService.findByName(this.name);

        if (!plt) {
            const work = new PlatformSource();

            work.name = this.name;
            work.link = "https://www.404works.com/";
            await this.platformService.insert(work);
        }
    }

    async eachPage(plt: PlatformSource, uri: string) {
        const response = await axios.get(`${plt.link}${uri}`);
        const data = await response.data;
        const $ = cheerio.load(data);
        const offer = new Offer();

        offer.title = $("h1.page-title").text();
        offer.link = uri;
        offer.targetId = `${plt.link}${uri}`;
        offer.description = $('.row p').text();
        offer.platform = plt;
        const pEl = $("div.row.no-mobile div:nth-child(2) p").html();
        const match = pEl.match(/([0-9]+[ ]?[\-€][ ]?)/ig);
        if (match) {
            const text = match.join("");
            offer.price = text;
        }
        await this.offerService.insert(offer);
    }

    async eachQuery(plt: PlatformSource, url: string) {
        const response = await axios.get(url);
        const data = await response.data;
        const $ = cheerio.load(data);
        const tab = $("div.container .row .twelve div.row").toArray();

        for (let item of tab) {
            const aEl = $(item).find("div h5 a");

            if (this.uniqList.indexOf(`${plt.link}${aEl.attr("href")}`) == -1)
                await this.eachPage(plt, aEl.attr("href"));
            this.uniqList.push(`${plt.link}${aEl.attr("href")}`);
        }
        const elNext = $("a[rel=next]").toArray();
        if (elNext.length) {
            const link = $(elNext[0]).attr("href");
            const url = `${plt.link}${link}`;

            await this.eachQuery(plt, url);
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
        const urls = [];
        const context = this.context.slice();
        for (let keyword of keywords) {
            for (let i = 0; i < context.length; i++) {
                const c = context[i];

                if (c.value.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    urls.push(`https://www.404works.com/fr/projects/job/${c.key}`);
                    context.splice(i, 1);
                    i--;
                }
            }
        }
        await this.batchUrls(plt, urls);
    }
}