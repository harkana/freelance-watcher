import { CronTask } from "..";

export abstract class CronTaskService {
    abstract findAll(): Array<CronTask>;
    abstract insert(offer: CronTask): CronTask;
    abstract findOne(id: number): CronTask;
    abstract update(offer: CronTask): CronTask;
    abstract delete(offer: CronTask): boolean;
}
