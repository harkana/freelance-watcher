import { Offer } from "..";

export abstract class OfferService {
    abstract findAll(): Array<Offer>;
    abstract insert(offer: Offer): Offer;
    abstract findOne(id: number): Offer;
    abstract update(offer: Offer): Offer;
    abstract delete(offer: Offer): boolean;
}
