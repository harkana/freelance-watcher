import { PlatformSource } from "../..";
import { PlatformService } from "../PlatformService";
import { EntityManager, getManager } from "typeorm";
import { Platform } from "puppeteer";
import { QueryPlatform } from "../../../resources";

export class PlatformServiceImpl implements PlatformService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
    }

    async findByName(name: string): Promise<PlatformSource> {
        const platform = await this.entityManager.createQueryBuilder(PlatformSource, "plt").where("plt.name = :name", {
            name
        }).getOne();

        return (platform);
    }

    async search(query: QueryPlatform): Promise<PlatformSource> {
        const platform = await this.entityManager
            .createQueryBuilder(PlatformSource, "plt")
            .leftJoinAndSelect("plt.tasks", "tasks")
            .leftJoinAndSelect("tasks.cronTaskKeywords", "keywords")
            .where("plt.name = :name", {
                "name": query.platformName
            }).getOne();

        return (platform);
    }

    async findAll(): Promise<PlatformSource[]> {
        const platforms = await this.entityManager.find(PlatformSource);

        return (platforms);
    }

    async insert(platform: PlatformSource): Promise<PlatformSource> {
        return (await this.entityManager.save(platform));
    }

    async findOne(id: number): Promise<PlatformSource> {
        const platform = await this.entityManager.findOne(PlatformSource, id);

        return (platform);
    }

    async update(platform: PlatformSource): Promise<PlatformSource> {
        return (await this.entityManager.save(platform));
    }

    async delete(platform: PlatformSource): Promise<boolean> {
        const result = await this.entityManager.delete(PlatformSource, platform.id);

        return (result.affected > 0);
    }

}