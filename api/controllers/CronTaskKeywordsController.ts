import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTaskKeywords } from "../models";
import { CronTaskKeywordsService } from "../models/services/CronTaskKeywordsService";


@Route("/cronTaskKeywords")
export class CronTaskKeywordsController extends Controller {

    cronTaskKeywordsService: CronTaskKeywordsService;

    constructor() {
        super();

        this.cronTaskKeywordsService = container.resolve('cronTaskKeywordsService');
    }

    @Get("/")
    async getAll() {
        return (await this.cronTaskKeywordsService.findAll());
    }

    @Get("/{cronTaskKeywordsId}")
    async getOne(@Path() cronTaskKeywordsId: number) {
        return (await this.cronTaskKeywordsService.findOne(cronTaskKeywordsId));
    }

    @Delete("/{cronTaskKeywordsId}")
    async deleteOne(@Path() cronTaskKeywordsId: number) {
        return (await this.cronTaskKeywordsService.delete(await this.cronTaskKeywordsService.findOne(cronTaskKeywordsId)));
    }

    @Put("/")
    async update(@Body() cronTaskKeywords: CronTaskKeywords) {
        return (await this.cronTaskKeywordsService.update(cronTaskKeywords));
    }

    @Post("/")
    async create(@Body() cronTaskKeywords: CronTaskKeywords) {
        return (await this.cronTaskKeywordsService.insert(cronTaskKeywords));
    }

}
