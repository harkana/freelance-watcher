import { CronTaskResource, KeywordsResource, OfferResource, PlatformResource, UserResource } from ".";
import { CronTask, CronTaskKeywords, Offer, PlatformSource, User } from "../models";

export class UserAsm {

    toResource(userEntity: User) {
        const userResource = new UserResource();

        userResource.id = userEntity.id;
        userResource.email = userEntity.email;
        userResource.password = userEntity.password;
        userResource.pseudo = userEntity.pseudo;
        userResource.createdAt = userEntity.createdAt;
        userResource.updatedAt = userEntity.updatedAt;
        return (userResource);
    }

    async withTasks(userResource: UserResource, userEntity: User) {
        const resolved = await userEntity.tasks;

        userResource.tasks = [];
        if (resolved && resolved.length) {
            for (let task of resolved) {
                const cronTaskAsm = new CronTaskAsm();
                const taskResource = cronTaskAsm.toResource(task);

                userResource.tasks.push(taskResource);
            }
        }
        return (userResource);
    }

}

export class PlatformAsm {

    toResource(platformEntity: PlatformSource) {
        const platformResource = new PlatformResource();

        platformResource.id = platformEntity.id;
        platformResource.name = platformEntity.name;
        platformResource.createdAt = platformEntity.createdAt;
        platformResource.updatedAt = platformEntity.updatedAt;
        return (platformResource)
    }

    async withTasks(platformResource: PlatformResource, platformEntity: PlatformSource) {
        const resolved = await platformEntity.tasks;
        platformResource.tasks = [];

        if (resolved && resolved.length) {
            for (let task of resolved) {
                console.log(task);
                const cronTaskAsm = new CronTaskAsm();
                const taskResource = cronTaskAsm.toResource(task);

                platformResource.tasks.push(taskResource);
            }
        }
        return (platformResource);
    }

    async withOffers(platformResource: PlatformResource, platformEntity: PlatformSource) {
        const resolved = await platformEntity.offers;
        platformResource.offers = [];

        if (resolved && resolved.length) {
            for (let offer of resolved) {
                const offerAsm = new OfferAsm();
                const offerResource = offerAsm.toResource(offer);

                platformResource.offers.push(offerResource);
            }
        }
        return (platformResource);
    }
}

export class CronTaskAsm {

    toResource(cronTask: CronTask) {
        const cronTaskResource = new CronTaskResource();

        cronTaskResource.id = cronTask.id;
        cronTaskResource.updatedAt = cronTask.updatedAt;
        cronTaskResource.createdAt = cronTask.createdAt;
        return (cronTaskResource);
    }

    withUser(cronTaskResource: CronTaskResource, cronTask: CronTask) {
        if (cronTask.user) {
            const userAsm = new UserAsm();
            const userResource = userAsm.toResource(cronTask.user);

            cronTaskResource.user = userResource;
        }
    }

    withPlatform(cronTaskResource: CronTaskResource, cronTask: CronTask) {
        if (cronTask.platform) {
            const pltAsm = new PlatformAsm();
            const pltResource = pltAsm.toResource(cronTask.platform);

            cronTaskResource.platform = pltResource;
        }
    }

    async withKeywords(cronTaskResource: CronTaskResource, cronTask: CronTask) {
        const resolved = await cronTask.cronTaskKeywords;

        cronTaskResource.cronTaskKeywords = [];
        if (resolved && resolved.length) {
            cronTaskResource.cronTaskKeywords = resolved.map((keyword) => {
                const keywordsAsm = new KeywordsAsm();

                return (keywordsAsm.toResource(keyword));
            })
        }
    }

}

export class KeywordsAsm {

    toResource(keywords: CronTaskKeywords) {
        const keywordsResource = new KeywordsResource();

        keywordsResource.id = keywords.id;
        keywordsResource.createdAt = keywords.createdAt;
        keywordsResource.updatedAt = keywords.updatedAt;
        keywordsResource.keyword = keywords.keyword;
        return (keywordsResource);
    }

    withCronTask(keywordsResource: KeywordsResource, keywords: CronTaskKeywords) {
        if (keywords.cronTask) {
            const asm = new CronTaskAsm();

            keywordsResource.cronTask = asm.toResource(keywords.cronTask);
        }
        return (keywordsResource);
    }
}

export class OfferAsm {

    toResource(offer: Offer) {
        const resource = new OfferResource();

        resource.id = offer.id;
        resource.description = offer.description;
        resource.link = offer.link;
        resource.price = offer.price;
        resource.title = offer.title;
        resource.createdAt = offer.createdAt;
        resource.updatedAt = offer.updatedAt;
        return (resource);
    }

    withPlatform(resource: OfferResource, offer: Offer) {
        if (offer.platform) {
            const platformAsm = new PlatformAsm();

            resource.platform = platformAsm.toResource(offer.platform);
        }
    }

}