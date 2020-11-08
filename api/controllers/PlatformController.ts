import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTask, Offer, PlatformSource, User } from "../models";
import { CronTaskService } from "../models/services/CronTaskService";
import { OfferService } from "../models/services/OfferService";
import { PlatformService } from "../models/services/PlatformService";
import { UserService } from "../models/services/UserService";
import { PlatformAsm } from "../resources/asm";


@Route("/platform")
export class PlatformController extends Controller {

    platformService: PlatformService;
    userService: UserService;
    cronTaskService: CronTaskService;
    offerService: OfferService;

    constructor() {
        super();

        this.platformService = container.resolve('platformService');
        this.userService = container.resolve('userService');
        this.cronTaskService = container.resolve('cronTaskService');
        this.offerService = container.resolve('offerService');
    }

    @Get("/")
    async getAll() {
        const list = await this.platformService.findAll();
        let ret = [];
        const asm = new PlatformAsm();

        for (let src of list) {
            const resource = asm.toResource(src);

            await asm.withOffers(resource, src);
            await asm.withTasks(resource, src);
            ret.push(resource);
        }
        return (ret);
    }

    @Get("/{platformId}")
    async getOne(@Path() platformId: number) {
        const plt = await this.platformService.findOne(platformId);
        const asm = new PlatformAsm();
        const resource = asm.toResource(plt);

        await asm.withOffers(resource, plt);
        await asm.withTasks(resource, plt);
        return (resource);
    }

    @Delete("/{platformId}")
    async deleteOne(@Path() platformId: number) {
        return (await this.platformService.delete(await this.platformService.findOne(platformId)));
    }

    @Put("/")
    async update(@Body() platform: PlatformSource) {
        const tosaved = new PlatformSource();
        tosaved.id = platform.id;
        tosaved.name = platform.name;
        tosaved.link = platform.link;
        if (platform.tasks) {
            tosaved.tasks = [];
            for (let task of platform.tasks) {
                let newTask = null;
                if (task.id) {
                    newTask = await this.cronTaskService.findOne(task.id);
                }
                else {
                    newTask = new CronTask();
                }
                if (task.platform) {
                    newTask.platform = tosaved;
                }
                if (task.user) {
                    if (task.user.id) {
                        newTask.user = await this.userService.findOne(task.user.id);
                    }
                    else {
                        newTask.user = new User();
                    }
                    newTask.user.email = task.user.email;
                    newTask.user.password = task.user.password;
                    newTask.user.pseudo = task.user.pseudo;
                }
                tosaved.tasks.push(newTask);
            }
        }
        if (platform.offers) {
            tosaved.offers = [];
            for (let offer of platform.offers) {
                let newOffer = null;
                if (offer.id) {
                    newOffer = await this.offerService.findOne(offer.id);
                }
                else {
                    newOffer = new Offer();
                }
                newOffer.title = offer.title;
                newOffer.description = offer.description;
                newOffer.link = offer.link;
                newOffer.price = offer.price;
                newOffer.targetId = offer.targetId;
                if (offer.platform) {
                    newOffer.platform = tosaved;
                }
                tosaved.offers.push(newOffer);
            }
        }
        const updated = await this.platformService.update(tosaved);
        const asm = new PlatformAsm();
        const resource = asm.toResource(updated);

        await asm.withOffers(resource, updated);
        await asm.withTasks(resource, updated);
        return (resource);
    }

    @Post("/")
    async create(@Body() platform: PlatformSource) {
        const tosaved = new PlatformSource();
        tosaved.name = platform.name;
        tosaved.link = platform.link;
        if (platform.tasks) {
            const tasks = [];
            for (let task of platform.tasks) {
                let newTask = null;
                if (task.id) {
                    newTask = await this.cronTaskService.findOne(task.id);
                }
                else {
                    newTask = new CronTask();
                }
                if (task.platform) {
                    newTask.platform = tosaved;
                }
                if (task.user) {
                    if (task.user.id) {
                        newTask.user = await this.userService.findOne(task.user.id);
                    }
                    else {
                        newTask.user = new User();
                    }
                    newTask.user.email = task.user.email;
                    newTask.user.password = task.user.password;
                    newTask.user.pseudo = task.user.pseudo;
                }
                tasks.push(newTask);
            }
            tosaved.tasks = tasks;
        }
        if (platform.offers) {
            const offers = [];
            for (let offer of platform.offers) {
                let newOffer = null;
                if (offer.id) {
                    newOffer = await this.offerService.findOne(offer.id);
                }
                else {
                    newOffer = new Offer();
                }
                newOffer.title = offer.title;
                newOffer.description = offer.description;
                newOffer.link = offer.link;
                newOffer.price = offer.price;
                newOffer.targetId = offer.targetId;
                if (offer.platform) {
                    newOffer.platform = tosaved;
                }
                offers.push(newOffer);
            }
            tosaved.offers = offers;
        }
        const saved = await this.platformService.insert(tosaved);
        const asm = new PlatformAsm();
        const resource = asm.toResource(saved);

        await asm.withOffers(resource, saved);
        await asm.withTasks(resource, saved);
        return (resource);
    }

}
