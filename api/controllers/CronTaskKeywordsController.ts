import e from "express";
import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTask, CronTaskKeywords, PlatformSource, User } from "../models";
import { CronTaskKeywordsService } from "../models/services/CronTaskKeywordsService";
import { CronTaskService } from "../models/services/CronTaskService";
import { PlatformService } from "../models/services/PlatformService";
import { UserService } from "../models/services/UserService";
import { CronTaskAsm, KeywordsAsm } from "../resources/asm";


@Route("/cronTaskKeywords")
export class CronTaskKeywordsController extends Controller {

    cronTaskKeywordsService: CronTaskKeywordsService;
    platformService: PlatformService;
    userService: UserService;
    cronTaskService: CronTaskService;

    constructor() {
        super();
        this.cronTaskKeywordsService = container.resolve('cronTaskKeywordsService');
        this.platformService = container.resolve('platformService');
        this.userService = container.resolve('userService');
        this.cronTaskService = container.resolve('cronTaskService');
    }

    @Get("/")
    async getAll() {
        const keywords = await this.cronTaskKeywordsService.findAll();
        const asm = new KeywordsAsm();
        const resources = keywords.map((k => {
            const res = asm.toResource(k);

            asm.withCronTask(res, k);
            return (res);
        }));
        return (resources);
    }

    @Get("/{cronTaskKeywordsId}")
    async getOne(@Path() cronTaskKeywordsId: number) {
        const k = await this.cronTaskKeywordsService.findOne(cronTaskKeywordsId);
        const asm = new KeywordsAsm();
        const resource = asm.toResource(k);

        return (resource);
    }

    @Delete("/{cronTaskKeywordsId}")
    async deleteOne(@Path() cronTaskKeywordsId: number) {
        return (await this.cronTaskKeywordsService.delete(await this.cronTaskKeywordsService.findOne(cronTaskKeywordsId)));
    }

    @Put("/")
    async update(@Body() cronTaskKeywords: CronTaskKeywords) {
        const toupdated = new CronTaskKeywords();

        toupdated.id = cronTaskKeywords.id;
        toupdated.keyword = cronTaskKeywords.keyword;
        if (cronTaskKeywords.cronTask) {
            if (cronTaskKeywords.cronTask.id) {
                toupdated.cronTask = await this.cronTaskService.findOne(cronTaskKeywords.cronTask.id);
            }
            else {
                toupdated.cronTask = new CronTask();
            }
            if (cronTaskKeywords.cronTask.platform) {
                if (cronTaskKeywords.cronTask.platform.id) {
                    toupdated.cronTask.platform = await this.platformService.findOne(cronTaskKeywords.cronTask.platform.id);
                }
                else {
                    toupdated.cronTask.platform = new PlatformSource();
                }
                toupdated.cronTask.platform.link = cronTaskKeywords.cronTask.platform.link;
                toupdated.cronTask.platform.name = cronTaskKeywords.cronTask.platform.name;
            }
            if (cronTaskKeywords.cronTask.user) {
                if (cronTaskKeywords.cronTask.user.id) {
                    toupdated.cronTask.user = await this.userService.findOne(cronTaskKeywords.cronTask.user.id);
                }
                else {
                    toupdated.cronTask.user = new User();
                    toupdated.cronTask.user.email = cronTaskKeywords.cronTask.user.email;
                    toupdated.cronTask.user.password = cronTaskKeywords.cronTask.user.password;
                    toupdated.cronTask.user.pseudo = cronTaskKeywords.cronTask.user.pseudo;
                }
            }
        }
        const updated = await this.cronTaskKeywordsService.update(toupdated);
        const asm = new KeywordsAsm();
        const resource = asm.toResource(updated);

        asm.withCronTask(resource, updated);
        return (resource);
    }

    @Post("/")
    async create(@Body() cronTaskKeywords: CronTaskKeywords) {
        const tosaved = new CronTaskKeywords();

        tosaved.keyword = cronTaskKeywords.keyword;
        if (cronTaskKeywords.cronTask) {
            if (cronTaskKeywords.cronTask.id) {
                tosaved.cronTask = await this.cronTaskService.findOne(cronTaskKeywords.cronTask.id);
            }
            else {
                tosaved.cronTask = new CronTask();
            }
            if (cronTaskKeywords.cronTask.platform) {
                if (cronTaskKeywords.cronTask.platform.id) {
                    tosaved.cronTask.platform = await this.platformService.findOne(cronTaskKeywords.cronTask.platform.id);
                }
                else {
                    tosaved.cronTask.platform = new PlatformSource();
                }
                tosaved.cronTask.platform.link = cronTaskKeywords.cronTask.platform.link;
                tosaved.cronTask.platform.name = cronTaskKeywords.cronTask.platform.name;
            }
            let hasUser = false;
            if (cronTaskKeywords.cronTask.user) {
                if (cronTaskKeywords.cronTask.user.id) {
                    tosaved.cronTask.user = await this.userService.findOne(cronTaskKeywords.cronTask.user.id);
                    if (tosaved.cronTask.user) {
                        hasUser = true;
                    }
                }
                if (!hasUser) {
                    tosaved.cronTask.user = new User();
                    tosaved.cronTask.user.email = cronTaskKeywords.cronTask.user.email;
                    tosaved.cronTask.user.password = cronTaskKeywords.cronTask.user.password;
                    tosaved.cronTask.user.pseudo = cronTaskKeywords.cronTask.user.pseudo;
                }
            }
        }
        try {
            console.log(tosaved);
            const saved = await this.cronTaskKeywordsService.insert(tosaved);
            const asm = new KeywordsAsm();
            const resource = asm.toResource(saved);

            asm.withCronTask(resource, saved);
            const taskAsm = new CronTaskAsm();

            taskAsm.withPlatform(resource.cronTask, saved.cronTask);
            taskAsm.withUser(resource.cronTask, saved.cronTask);
            return (resource);
        }
        catch (e) {
            console.log(e.message);
            return (null);
        }
    }

}
