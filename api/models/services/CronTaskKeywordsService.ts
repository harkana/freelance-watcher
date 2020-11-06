import { CronTaskKeywords } from "..";

export abstract class CronTaskKeywordsService {
    abstract findAll(): Promise<Array<CronTaskKeywords>>;
    abstract insert(cronTaskKeywords: CronTaskKeywords): Promise<CronTaskKeywords>;
    abstract findOne(id: number): Promise<CronTaskKeywords>;
    abstract update(cronTaskKeywords: CronTaskKeywords): Promise<CronTaskKeywords>;
    abstract delete(cronTaskKeywords: CronTaskKeywords): Promise<boolean>;
}
