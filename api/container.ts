import * as awilix from "awilix";
import { UserServiceImpl } from "./models/services/impl/UserService";
import { PlatformServiceImpl } from "./models/services/impl/PlatformService";
import { OfferServiceImpl } from "./models/services/impl/OfferService";
import { CronTaskServiceImpl } from "./models/services/impl/CronTaskService";
import { CronTaskKeywordsServiceImpl } from "./models/services/impl/CronTaskKeywordsService";
import { RegisterRoutes } from "./build/routes"

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC
}).register({
    registerRoutes: awilix.asFunction(() => RegisterRoutes).singleton().classic(),
    userService: awilix.asClass(UserServiceImpl).proxy().scoped(),
    platformService: awilix.asClass(PlatformServiceImpl).proxy().scoped(),
    offerService: awilix.asClass(OfferServiceImpl).proxy().scoped(),
    cronTaskService: awilix.asClass(CronTaskServiceImpl).proxy().scoped(),
    cronTaskKeywordsService: awilix.asClass(CronTaskKeywordsServiceImpl).proxy().scoped()
});

