import ParseFreelanceInformatique from "./freelance-informatique";

export class Freelance {
    async bootstrap(){
        try {
            const o = new ParseFreelanceInformatique();

            await o.bootstrap();
        }
        catch (e){
            console.log(e);
        }
    }
}