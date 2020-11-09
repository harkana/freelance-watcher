import { Offer } from "..";
import { OffersPaginate, QueryPagination } from "../../resources";

export abstract class OfferService {
    abstract findAll(query: QueryPagination, filters: Array<string>): Promise<[Offer[], number]>;
    abstract insert(offer: Offer): Promise<Offer>;
    abstract findOne(id: number): Promise<Offer>;
    abstract update(offer: Offer): Promise<Offer>;
    abstract delete(offer: Offer): Promise<boolean>;
    abstract count(): Promise<number>;
}
