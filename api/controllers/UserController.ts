import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { container } from "../container";
import { User } from "../models";
import { UserService } from "../models/services/UserService";


@Route("/user")
export class UserController extends Controller {

    userService: UserService;

    constructor() {
        super();

        this.userService = container.resolve('userService');
    }

    @Get("/")
    async getAll() {
        return (await this.userService.findAll());
    }

    @Get("/{userId}")
    async getOne(@Path() userId: number) {
        return (await this.userService.findOne(userId));
    }

    @Delete("/{userId}")
    async deleteOne(@Path() userId: number) {
        return (await this.userService.delete(await this.userService.findOne(userId)));
    }

    @Put("/")
    async update(@Body() user: User) {
        return (await this.userService.update(user));
    }

    @Post("/")
    async create(@Body() user: User) {
        return (await this.userService.insert(user));
    }

}