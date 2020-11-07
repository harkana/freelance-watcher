export class RootResource {
    createdAt?: Date;
    updatedAt?: Date;
}

export class PlatformResource extends RootResource {
    id?: number;
    name: string;
    link: string;
    offers?: Array<OfferResource>;
    tasks?: Array<CronTaskResource>;
}

export class OfferResource extends RootResource {
    id?: number;
    title: string;
    description: string;
    price: string;
    link: string;
    targetId: string;
    place: string;
    duration: number;
    startTime: Date;
    platform: PlatformResource;
}

export class UserResource extends RootResource {
    id?: number;
    pseudo: string;
    email: string;
    password: string;
    tasks?: Array<CronTaskResource>;
}

export class CronTaskResource extends RootResource {
    id?: number;
    platform: PlatformResource;
    user: UserResource;
    cronTaskKeywords?: Array<KeywordsResource>;
}

export class KeywordsResource extends RootResource {
    id?: number;
    cronTask: CronTaskResource;
    keyword: string;
}


export interface QueryPlatform {
    userId?: number;
    platformName?: string;
}