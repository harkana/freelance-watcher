import ParseFreelanceInformatique from "./freelance-informatique";
import ParseTwago from "./twago";
import ParseKicklox from "./kicklox";
import { Parse404Works } from "./404works";

export class Freelance {
    async bootstrap() {
        try {
            const fi = new ParseFreelanceInformatique();
            const twago = new ParseTwago();
            const kicklox = new ParseKicklox();
            const work = new Parse404Works();

            await fi.bootstrap();
            await twago.boostrap();
            await kicklox.bootstrap();
            await work.bootstrap();
        }
        catch (e) {
            console.log(e);
        }
    }
}