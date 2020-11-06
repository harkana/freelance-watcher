import { EntityManager, getManager } from "typeorm";
import { CronTaskKeywords } from "../..";
import { CronTaskKeywordsService } from "../CronTaskKeywordsService";

export class CronTaskKeywordsServiceImpl implements CronTaskKeywordsService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
    }

    async findAll(): Promise<CronTaskKeywords[]> {
        const keywords = await this.entityManager.find(CronTaskKeywords);

        return (keywords);
    }

    async insert(cronTaskKeywords: CronTaskKeywords): Promise<CronTaskKeywords> {
        return (await this.entityManager.save(cronTaskKeywords));
    }

    async findOne(id: number): Promise<CronTaskKeywords> {
        return (await this.entityManager.findOne(CronTaskKeywords, id));
    }

    async update(cronTaskKeywords: CronTaskKeywords): Promise<CronTaskKeywords> {
        return (await this.entityManager.save(cronTaskKeywords));
    }

    async delete(cronTaskKeywords: CronTaskKeywords): Promise<boolean> {
        const result = await this.entityManager.delete(CronTaskKeywords, cronTaskKeywords.id);

        return (result.affected > 0);
    }


}