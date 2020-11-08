import ParseFreelanceInformatique from "./freelance-informatique";
import ParseKicklox from "./kicklox";
import { Parse404Works } from "./404works";
import { ParseFiverr } from "./fiverr";
import { container } from "../container";
import { PlatformService } from "../models/services/PlatformService";
import { PlatformServiceImpl } from "../models/services/impl/PlatformService";
import { AbstractParse } from "./AbstractParse";

const arr = [
    Parse404Works,
    ParseKicklox,
    ParseFreelanceInformatique,
    ParseFiverr
];

export class Freelance {
    platformService: PlatformService;
    parsers: Array<AbstractParse>;

    constructor() {
        this.platformService = container.resolve('platformService');
        this.parsers = [];
    }

    async bootstrap() {
        try {
            const platforms = await this.platformService.findAll();


            for (let platform of platforms) {
                for (let o of arr){
                    if (o.NAME === platform.name){
                        this.parsers.push(new o());
                    }
                }
            }
            for (let parser of this.parsers){
                await parser.bootstrap();
                await parser.run();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}