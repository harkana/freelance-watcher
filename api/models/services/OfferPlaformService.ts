import { OfferPlatform } from "../Offers";

export abstract class  OfferPlatformService {
    abstract findAll() : Array<OfferPlatform>;
    abstract findOne(id: number): OfferPlatform;
    abstract deleteOne(id: number): OfferPlatform;
    abstract update(plaform: OfferPlatform): OfferPlatform;
    abstract insert(platform: OfferPlatform): OfferPlatform;
}
