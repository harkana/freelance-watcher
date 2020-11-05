import { PlatformModel } from './Platform'

export interface RuleModel {
    id: number;
    platform: PlatformModel;
    keywords: Array<string>;
}
