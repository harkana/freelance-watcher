import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { PlatformSource } from "../models";
import { PlatformService } from "../models/services/PlatformService";


@Route("/platform")
export class PlatformController extends Controller {

    platformService: PlatformService;

    constructor() {
        super();

        this.platformService = container.resolve('platformService');
    }

    @Get("/")
    async getAll() {
        return (await this.platformService.findAll());
    }

    @Get("/{platformId}")
    async getOne(@Path() platformId: number) {
        return (await this.platformService.findOne(platformId));
    }

    @Delete("/{platformId}")
    async deleteOne(@Path() platformId: number) {
        return (await this.platformService.delete(await this.platformService.findOne(platformId)));
    }

    @Put("/")
    async update(@Body() platform: PlatformSource) {
        return (await this.platformService.update(platform));
    }

    @Post("/")
    async create(@Body() platform: PlatformSource) {
        return (await this.platformService.insert(platform));
    }

}
