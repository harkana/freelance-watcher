import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTask, CronTaskKeywords, PlatformSource, User } from "../models";
import { CronTaskService } from "../models/services/CronTaskService";
import { PlatformService } from "../models/services/PlatformService";
import { UserService } from "../models/services/UserService";
import { CronTaskAsm } from "../resources/asm";


@Route("/cronTask")
export class CronTaskController extends Controller {

    cronTaskService: CronTaskService;
    userService: UserService;
    platformService: PlatformService;

    constructor() {
        super();

        this.cronTaskService = container.resolve('cronTaskService');
        this.userService = container.resolve('userService');
        this.platformService = container.resolve('platformService');
    }

    @Get("/")
    async getAll() {
        const list = await this.cronTaskService.findAll();
        const asm = new CronTaskAsm();
        const ret = [];
        for (let task of list) {
            const resource = asm.toResource(task);

            asm.withUser(resource, task);
            asm.withPlatform(resource, task);
            await asm.withKeywords(resource, task);
            ret.push(resource);
        }
        return (ret);
    }

    @Get("/{cronTaskId}")
    async getOne(@Path() cronTaskId: number) {
        const cronTask = await this.cronTaskService.findOne(cronTaskId);
        const asm = new CronTaskAsm();
        const resource = asm.toResource(cronTask);

        asm.withUser(resource, cronTask);
        asm.withPlatform(resource, cronTask);
        await asm.withKeywords(resource, cronTask);
        return (resource);
    }

    @Delete("/{cronTaskId}")
    async deleteOne(@Path() cronTaskId: number) {
        return (await this.cronTaskService.delete(await this.cronTaskService.findOne(cronTaskId)));
    }

    @Put("/")
    async update(@Body() cronTask: CronTask) {
        const toupdated = new CronTask();

        toupdated.id = cronTask.id;
        if (cronTask.platform) {
            if (cronTask.platform.id) {
                toupdated.platform = await this.platformService.findOne(cronTask.platform.id);
            }
            else {
                toupdated.platform = new PlatformSource();
            }
            toupdated.platform.link = cronTask.platform.link;
            toupdated.platform.name = cronTask.platform.name;
        }
        if (cronTask.user) {
            if (cronTask.user.id) {
                toupdated.user = await this.userService.findOne(cronTask.user.id);
            }
            else {
                toupdated.user = new User();
            }
            toupdated.user.email = cronTask.user.email;
            toupdated.user.password = cronTask.user.password;
            toupdated.user.pseudo = cronTask.user.pseudo;
        }
        const updated = await this.cronTaskService.update(toupdated);
        const asm = new CronTaskAsm();
        const resource = asm.toResource(updated);

        asm.withUser(resource, updated);
        asm.withPlatform(resource, updated);
        await asm.withKeywords(resource, updated);
        return (resource);
    }

    @Post("/")
    async create(@Body() cronTask: CronTask) {
        const tosaved = new CronTask();

        tosaved.id = cronTask.id;
        if (cronTask.platform) {
            if (cronTask.platform.id) {
                tosaved.platform = await this.platformService.findOne(cronTask.platform.id);
            }
            else {
                tosaved.platform = new PlatformSource();
            }
            tosaved.platform.link = cronTask.platform.link;
            tosaved.platform.name = cronTask.platform.name;
        }
        if (cronTask.user) {
            if (cronTask.user.id) {
                tosaved.user = await this.userService.findOne(cronTask.user.id);
            }
            else {
                tosaved.user = new User();
            }
            tosaved.user.email = cronTask.user.email;
            tosaved.user.password = cronTask.user.password;
            tosaved.user.pseudo = cronTask.user.pseudo;
        }
        const saved = await this.cronTaskService.insert(tosaved);
        const asm = new CronTaskAsm();
        const resource = asm.toResource(saved);

        asm.withUser(resource, saved);
        asm.withPlatform(resource, saved);
        await asm.withKeywords(resource, saved);
        return (resource);
    }

}
