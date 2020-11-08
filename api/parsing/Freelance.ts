import ParseFreelanceInformatique from "./freelance-informatique";
import ParseKicklox from "./kicklox";
import { Parse404Works } from "./404works";
import { ParseFiverr } from "./fiverr";

export class Freelance {
    async bootstrap() {
        try {
            const fi = new ParseFreelanceInformatique();
            const kicklox = new ParseKicklox();
            const work = new Parse404Works();
            const fiverr = new ParseFiverr();

            await fi.bootstrap();
            await kicklox.bootstrap();
            await work.bootstrap();
            await fiverr.bootstrap();
        }
        catch (e) {
            console.log(e);
        }
    }
}