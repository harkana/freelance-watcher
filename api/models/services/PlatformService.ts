import { Platform } from "..";

export abstract class PlatformService {
    abstract findAll(): Promise<Array<Platform>>;
    abstract insert(platform: Platform): Promise<Platform>;
    abstract findOne(id: number): Promise<Platform>;
    abstract update(platform: Platform): Promise<Platform>;
    abstract delete(platform: Platform): Promise<boolean>;
}
