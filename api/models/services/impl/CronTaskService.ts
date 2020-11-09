import { EntityManager, getManager } from "typeorm";
import { CronTask } from "../..";
import { CronTaskKeywordsService } from "../CronTaskKeywordsService";
import { CronTaskService } from "../CronTaskService";
import { CronTaskKeywordsServiceImpl } from "./CronTaskKeywordsService";

export class CronTaskServiceImpl implements CronTaskService {

    private entityManager: EntityManager;
    private keywordService: CronTaskKeywordsService;

    constructor() {
        this.entityManager = getManager('app');
        this.keywordService = new CronTaskKeywordsServiceImpl();
    }

    async findAll(): Promise<CronTask[]> {
        const tasks = await this.entityManager.find(CronTask);

        return (tasks);
    }

    async insert(cronTask: CronTask): Promise<CronTask> {
        return (await this.entityManager.save(cronTask));
    }

    async findOne(id: number): Promise<CronTask> {
        const task = await this.entityManager.findOne(CronTask, id);

        return (task);
    }

    async update(cronTask: CronTask): Promise<CronTask> {
        return (await this.entityManager.save(cronTask));
    }

    async delete(cronTask: CronTask): Promise<boolean> {
        try {
            const keywords = await cronTask.cronTaskKeywords;

            for (let keyword of keywords) {
                this.keywordService.delete(keyword);
            }
            const result = await this.entityManager.delete(CronTask, cronTask.id);

            return (result.affected > 0);
        }
        catch (e) {
            return (false);
        }

    }

}