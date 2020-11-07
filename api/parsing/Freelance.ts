import ParseFreelanceInformatique from "./freelance-informatique";
import ParseTwago from "./twago";
import ParseKicklox from "./kicklox";

export class Freelance {
    async bootstrap() {
        try {
            const fi = new ParseFreelanceInformatique();
            const twago = new ParseTwago();
            const kicklox = new ParseKicklox();

            await fi.bootstrap();
            await twago.boostrap();
            await kicklox.bootstrap();
        }
        catch (e) {
            console.log(e);
        }
    }
}