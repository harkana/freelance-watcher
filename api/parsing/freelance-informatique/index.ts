import { Overrides, Platform } from "puppeteer";
import { Offer, PlatformSource } from "../../models";
import { container } from "../../container";
import { PlatformService } from "../../models/services/PlatformService";
import { QueryPlatform } from "../../resources";
import fs from "fs";
import axios from "axios";
import qs from "qs";
import cheerio from "cheerio";
import { OfferService } from "../../models/services/OfferService";
import moment from "moment";
import { decode } from "iconv-lite";

export default class ParseFreelanceInformatique {

    private name: string;
    private platformService: PlatformService;
    private offerService: OfferService;

    constructor() {
        this.name = "freelance-informatique";
        this.platformService = container.resolve('platformService');
        this.offerService = container.resolve('offerService');
    }

    async bootstrap() {
        const plaform: PlatformSource = await this.platformService.findByName(this.name);
        if (!plaform) {
            const nPlt = new PlatformSource();
            nPlt.name = this.name;
            nPlt.link = "https://www.freelance-informatique.fr";

            await this.platformService.insert(nPlt);
        }
    }


    async run() {
        const query: QueryPlatform = {
            platformName: this.name
        };
        const plt: PlatformSource = await this.platformService.search(query);
        let keywords: Array<string> = [];
        const tasks = await plt.tasks;
        for (let task of tasks) {
            const cronTaskKeywords = await task.cronTaskKeywords;
            if (cronTaskKeywords && cronTaskKeywords.length) {
                keywords = cronTaskKeywords.map((crk) => crk.keyword);
            }
        }
        for (let keyword of keywords) {
            const copy : any = axios;
            const response = await copy({
                method: 'post',
                url: 'https://www.freelance-informatique.fr/offres-freelance',
                data: qs.stringify({
                    competences: keyword,
                    region: 0,
                    'new_region': 8,
                    'type_recherche_regions': 'new',
                    'redirectToLoginPage': 0
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                responseType: "arraybuffer",
                responseEncoding: "binary"
            });
            const responseBody = await response.data;
            const data = decode(responseBody, "ISO-8859-1");
            const $ = cheerio.load(data, { decodeEntities: false });
            const tab = $(".careerfy-job-listing").find(".careerfy-column-12").toArray();
            for (let item of tab) {
                const offer = new Offer();
                const aEl = $(item).find('.careerfy-featured-listing-title a');
                offer.link = aEl.attr('href');
                offer.title = aEl.text();
                const descEl = $(item).find('.description');
                offer.description = descEl.text();
                offer.platform = plt;
                offer.targetId = offer.link;
                const li = $(item).find(".careerfy-featured-listing-options li").toArray();
                for (let liItem of li) {
                    const titleItem = $(liItem).attr("title");
                    if (titleItem === "Localisation") {
                        offer.place = $(liItem).text();
                    }
                    else if (titleItem === "Date de début envisagée") {
                        const text = ($(liItem).text());

                        offer.startTime = null;
                        if (text.trim() !== "ASAP"){
                            offer.startTime = moment(text.trim(), "DD/MM/YYYY").toDate();
                        }
                    }
                    else if (titleItem === "Durée") {
                        const t = $(liItem).text();
                        const nbArr = t.match(/[0-9]+/ig)
                        if (nbArr.length) {
                            offer.duration = Math.floor(moment().month(Number(nbArr[0])).toDate().getTime() / 1000);
                        }
                    }
                }
                try {
                    await this.offerService.insert(offer);
                }
                catch (e){
                    console.log(e.message);
                }
            }
        }
    }

}