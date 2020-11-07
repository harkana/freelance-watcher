import { Platform } from "puppeteer";
import { PlatformSource } from "..";
import { QueryPlatform } from "../../resources";

export abstract class PlatformService {
    abstract findAll(): Promise<Array<PlatformSource>>;
    abstract insert(platform: PlatformSource): Promise<PlatformSource>;
    abstract findOne(id: number): Promise<PlatformSource>;
    abstract update(platform: PlatformSource): Promise<PlatformSource>;
    abstract delete(platform: PlatformSource): Promise<boolean>;
    abstract search(query: QueryPlatform): Promise<PlatformSource>;
    abstract findByName(name: string): Promise<PlatformSource>;
}
