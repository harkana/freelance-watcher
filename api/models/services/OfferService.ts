import { Offer } from "..";

export abstract class OfferService {
    abstract findAll(): Promise<Array<Offer>>;
    abstract insert(offer: Offer): Promise<Offer>;
    abstract findOne(id: number): Promise<Offer>;
    abstract update(offer: Offer): Promise<Offer>;
    abstract delete(offer: Offer): Promise<boolean>;
}
