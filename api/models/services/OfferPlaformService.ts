import { Platform } from "..";

export abstract class  OfferPlatformService {
    abstract findAll() : Array<Platform>;
    abstract findOne(id: number): Platform;
    abstract deleteOne(id: number): Platform;
    abstract update(plaform: Platform): Platform;
    abstract insert(platform: Platform): Platform;
}
