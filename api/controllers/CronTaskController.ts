import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTask } from "../models";
import { CronTaskService } from "../models/services/CronTaskService";


@Route("/cronTask")
export class CronTaskController extends Controller {

    cronTaskService: CronTaskService;

    constructor() {
        super();

        this.cronTaskService = container.resolve('cronTaskService');
    }

    @Get("/")
    async getAll() {
        return (await this.cronTaskService.findAll());
    }

    @Get("/{cronTaskId}")
    async getOne(@Path() cronTaskId: number) {
        return (await this.cronTaskService.findOne(cronTaskId));
    }

    @Delete("/{cronTaskId}")
    async deleteOne(@Path() cronTaskId: number) {
        return (await this.cronTaskService.delete(await this.cronTaskService.findOne(cronTaskId)));
    }

    @Put("/")
    async update(@Body() cronTask: CronTask) {
        return (await this.cronTaskService.update(cronTask));
    }

    @Post("/")
    async create(@Body() cronTask: CronTask) {
        return (await this.cronTaskService.insert(cronTask));
    }

}
