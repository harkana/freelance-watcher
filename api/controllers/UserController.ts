import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { CronTask, CronTaskKeywords, PlatformSource, User } from "../models";
import { UserService } from "../models/services/UserService";
import { UserResource } from "../resources";
import { UserAsm } from "../resources/asm";


@Route("/user")
export class UserController extends Controller {

    userService: UserService;

    constructor() {
        super();

        this.userService = container.resolve('userService');
    }

    @Get("/")
    async getAll() {
        const list = await this.userService.findAll();
        const asm = new UserAsm();
        const ret = [];

        for (let user of list) {
            const resource = asm.toResource(user);

            await asm.withTasks(resource, user);
            ret.push(resource);
        }
        return (ret);
    }

    @Get("/{userId}")
    async getOne(@Path() userId: number) {
        const user = await this.userService.findOne(userId);
        const asm = new UserAsm();
        const resource = asm.toResource(user);

        await asm.withTasks(resource, user);
        return (resource);
    }

    @Delete("/{userId}")
    async deleteOne(@Path() userId: number) {
        return (await this.userService.delete(await this.userService.findOne(userId)));
    }

    @Put("/")
    async update(@Body() user: User) {
        const toupdated = new User();
        toupdated.email = user.email;
        toupdated.password = user.password;
        toupdated.pseudo = user.pseudo;
        toupdated.id = user.id;
        const updated = await this.userService.update(toupdated);
        const asm = new UserAsm();
        const resource = asm.toResource(updated);

        await asm.withTasks(resource, updated);
        return (resource);
    }

    @Post("/")
    async create(@Body() user: User) {
        const tosaved = new User();
        tosaved.email = user.email;
        tosaved.password = user.password;
        tosaved.pseudo = user.pseudo;
        const saved = await this.userService.insert(tosaved);
        const asm = new UserAsm();
        const resource = asm.toResource(saved);

        await asm.withTasks(resource, saved);
        return (resource);
    }

}