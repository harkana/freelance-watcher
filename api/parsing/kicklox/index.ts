import { OfferService } from "../../models/services/OfferService";
import { PlatformService } from "../../models/services/PlatformService";
import { container } from "../../container";
import { Offer, PlatformSource } from "../../models";
import { QueryPlatform } from "../../resources";
import axios from "axios";
import cheerio from "cheerio";
import { AbstractParse } from "../AbstractParse";

export default class ParseKicklox implements AbstractParse {

    static NAME: string = "kicklox";
    private offerService: OfferService;
    private platformService: PlatformService;

    constructor() {
        this.offerService = container.resolve('offerService');
        this.platformService = container.resolve('platformService');
    }

    async bootstrap() {
        const plt = await this.platformService.findByName(ParseKicklox.NAME);

        if (!plt) {
            const kicklox = new PlatformSource();

            kicklox.name = ParseKicklox.NAME;
            kicklox.link = "https://www.kicklox.com";
            await this.platformService.insert(kicklox);
        }
    }

    async request(url: string, plt: PlatformSource, keywords: string[]) {
        const response = await axios.get(url);
        const data = response.data;
        const $ = cheerio.load(data, { decodeEntities: false });
        const tab = $("section:nth-child(3) section section").toArray();
        const newTab = [];

        for (let item of tab) {
            const offer = new Offer();
            const el = $(item).find('.elementor-column-wrap.elementor-element-populated');
            const elArr = $(el).find('.elementor-widget-container .elementor-heading-title.elementor-size-default').toArray();

            offer.title = $(elArr[0]).text();
            offer.description = $(elArr[1]).text();
            offer.link = $(item).find('.make-column-clickable-elementor').attr("data-column-clickable");
            offer.platform = plt;
            offer.targetId = offer.link;
            let flag = false;
            for (let keyword of keywords) {
                if (offer.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                    offer.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    flag = true;
                }
            }
            if (flag) {
                newTab.push(offer);
            }
        }
        for (let offer of newTab) {
            await this.offerService.insert(offer);
        }
    }

    async run() {
        const uri = "/opportunites-missions-cdi";
        const query: QueryPlatform = {
            platformName: ParseKicklox.NAME
        };
        const plt: PlatformSource = await this.platformService.search(query);
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
        const url = `${plt.link}${uri}`;
        await this.request(url, plt, keywords);
    }

}