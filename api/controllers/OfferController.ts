import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { Offer } from "../models";
import { OfferService } from "../models/services/OfferService";


@Route("/offer")
export class OfferController extends Controller {

    offerService: OfferService;

    constructor(){
        super();

        this.offerService = container.resolve('offerService');
    }

    @Get("/")
    async getAll() {
        return (await this.offerService.findAll());
    }

    @Get("/{offerId}")
    async getOne(@Path() offerId: number) {
        return (await this.offerService.findOne(offerId));
    }

    @Delete("/{offerId}")
    async deleteOne(@Path() offerId: number) {
        return (await this.offerService.delete(await this.offerService.findOne(offerId)));
    }

    @Put("/")
    async update(@Body() offer: Offer) {
        return (await this.offerService.update(offer));
    }

    @Post("/")
    async create(@Body() offer: Offer) {
        return (await this.offerService.insert(offer));
    }

}
