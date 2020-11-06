import { EntityManager, getManager } from "typeorm";
import { CronTask } from "../..";
import { CronTaskService } from "../CronTaskService";

export class CronTaskServiceImpl implements CronTaskService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
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
        const result = await this.entityManager.delete(CronTask, cronTask.id);

        return (result.affected > 0);
    }
    
}