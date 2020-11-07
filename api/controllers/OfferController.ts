import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { Offer, PlatformSource } from "../models";
import { OfferService } from "../models/services/OfferService";
import { PlatformService } from "../models/services/PlatformService";
import { OfferAsm } from "../resources/asm";


@Route("/offer")
export class OfferController extends Controller {

    offerService: OfferService;
    plaformService: PlatformService;

    constructor() {
        super();

        this.offerService = container.resolve('offerService');
        this.plaformService = container.resolve('platformService');
    }

    @Get("/")
    async getAll() {
        const list = await this.offerService.findAll();
        const asm = new OfferAsm();
        const resources = list.map((offer) => {
            const resource = asm.toResource(offer);

            asm.withPlatform(resource, offer);
            return (resource);
        })
        return (resources);
    }

    @Get("/{offerId}")
    async getOne(@Path() offerId: number) {
        const offer = await this.offerService.findOne(offerId);
        const asm = new OfferAsm();
        const resource = asm.toResource(offer);

        asm.withPlatform(resource, offer);
        return (resource);
    }

    @Delete("/{offerId}")
    async deleteOne(@Path() offerId: number) {
        return (await this.offerService.delete(await this.offerService.findOne(offerId)));
    }

    @Put("/")
    async update(@Body() offer: Offer) {
        const toupdated = new Offer();

        toupdated.id = offer.id;
        toupdated.title = offer.title;
        toupdated.description = offer.description;
        toupdated.link = offer.link;
        toupdated.price = offer.price;
        toupdated.targetId = offer.targetId;
        if (offer.platform) {
            if (offer.platform.id) {
                toupdated.platform = await this.plaformService.findOne(offer.platform.id);
            }
            else {
                toupdated.platform = new PlatformSource();
            }
            toupdated.platform.name = offer.platform.name;
            toupdated.platform.link = offer.platform.link;
        }
        const updated = await this.offerService.update(toupdated);
        const asm = new OfferAsm();
        const resource = asm.toResource(updated);

        asm.withPlatform(resource, updated);
        return (resource);
    }

    @Post("/")
    async create(@Body() offer: Offer) {
        const tosaved = new Offer();

        tosaved.title = offer.title;
        tosaved.description = offer.description;
        tosaved.link = offer.link;
        tosaved.price = offer.price;
        tosaved.targetId = offer.targetId;
        if (offer.platform) {
            if (offer.platform.id) {
                tosaved.platform = await this.plaformService.findOne(offer.platform.id);
            }
            else {
                tosaved.platform = new PlatformSource();
            }
            tosaved.platform.name = offer.platform.name;
            tosaved.platform.link = offer.platform.link;
        }
        const saved = await this.offerService.insert(tosaved);
        const asm = new OfferAsm();
        const resource = asm.toResource(saved);

        asm.withPlatform(resource, saved);
        return (resource);
    }

}
