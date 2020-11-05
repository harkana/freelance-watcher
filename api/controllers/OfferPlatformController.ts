import { Controller, Get, Route } from "tsoa";
import { OfferPlatform } from "../models/Offers";
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
    async findAll() : Promise<Array<OfferPlatform>>{
        const platforms = await this.offerPlaformService.findAll();

        return (platforms);
    }

}