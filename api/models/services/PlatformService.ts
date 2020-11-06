import { Platform } from "..";

export abstract class PlatformService {
    abstract findAll(): Array<Platform>;
    abstract insert(offer: Platform): Platform;
    abstract findOne(id: number): Platform;
    abstract update(offer: Platform): Platform;
    abstract delete(offer: Platform): boolean;
}
