export class OfferPlatform {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Offer {
    id: number;
    title: string;
    description: string;
    price: string;
    link: string;
    targetId: string;
    platform: OfferPlatform;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    id: number;
    pseudo: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CronTask {
    id: number;
    platformId: number;
    userId: number;
    keywords: string;
}
