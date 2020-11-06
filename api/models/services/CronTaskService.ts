import { CronTask } from "..";

export abstract class CronTaskService {
    abstract findAll(): Promise<Array<CronTask>>;
    abstract insert(cronTask: CronTask): Promise<CronTask>;
    abstract findOne(id: number): Promise<CronTask>;
    abstract update(cronTask: CronTask): Promise<CronTask>;
    abstract delete(cronTask: CronTask): Promise<boolean>;
}
