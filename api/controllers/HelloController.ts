import { HttpEntity } from "../http/httpEntity";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";

@Route("/hello")
export class HelloController extends Controller {
    constructor() {
        super();
    }

    @Get("/")
    hello() {
        return ("Hello World");
    }
}