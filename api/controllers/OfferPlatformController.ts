import { Controller, Get, Route } from "tsoa";
import { Platform } from "../models";
import { OfferPlatformServiceImpl } from "../models/services/impl/OfferPlatformService";
import { OfferPlatformService } from "../models/services/OfferPlaformService";

@Route("/api/plaform")
export class OfferPlatformController extends Controller {

    offerPlaformService: OfferPlatformService;

    constructor(){
        super();
        this.offerPlaformService = new OfferPlatformServiceImpl();
    }

    @Get("/")
    async findAll() : Promise<Array<Platform>>{
        const platforms = await this.offerPlaformService.findAll();

        return (platforms);
    }

}