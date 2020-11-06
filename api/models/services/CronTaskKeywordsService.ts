import { CronTaskKeywords } from "..";

export abstract class CronTaskKeywordsService {
    abstract findAll(): Array<CronTaskKeywords>;
    abstract insert(offer: CronTaskKeywords): CronTaskKeywords;
    abstract findOne(id: number): CronTaskKeywords;
    abstract update(offer: CronTaskKeywords): CronTaskKeywords;
    abstract delete(offer: CronTaskKeywords): boolean;
}
