import ParseFreelanceInformatique from "./freelance-informatique";
import ParseKicklox from "./kicklox";
import { Parse404Works } from "./404works";
import { ParseFiverr } from "./fiverr";
import { container } from "../container";
import { PlatformService } from "../models/services/PlatformService";
import { PlatformServiceImpl } from "../models/services/impl/PlatformService";
import { AbstractParse } from "./AbstractParse";
import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import dotenv from "dotenv";

const arr = [
    Parse404Works,
    ParseKicklox,
    ParseFreelanceInformatique,
    ParseFiverr
];

export class Freelance {
    platformService: PlatformService;
    parsers: Array<AbstractParse>;
    selectedPlatform: string;

    constructor() {
        this.platformService = container.resolve('platformService');
        this.parsers = [];
        this.selectedPlatform = null;
    }

    setSelectedPlatform(str: string) {
        this.selectedPlatform = str;
    }

    async bootstrap() {
        try {
            const platforms = await this.platformService.findAll();


            for (let platform of platforms) {
                for (let o of arr) {
                    if (o.NAME === platform.name) {
                        if (!this.selectedPlatform ||
                            (this.selectedPlatform === platform.name &&
                                this.selectedPlatform === o.NAME)) {
                            this.parsers.push(new o());
                        }
                    }
                }
            }
            for (let parser of this.parsers) {
                try {
                    await parser.bootstrap();
                    await parser.run();
                }
                catch (e){
                    console.log(e.message);
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

