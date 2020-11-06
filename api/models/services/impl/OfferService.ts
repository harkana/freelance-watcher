import { Offer } from "../..";
import { OfferService } from "../OfferService";
import { EntityManager, getManager } from "typeorm";

export class OfferServiceImpl implements OfferService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
    }

    async findAll(): Promise<Offer[]> {
        const offers = await this.entityManager.find(Offer);

        return (offers);
    }

    async insert(offer: Offer): Promise<Offer> {
        return (await this.entityManager.save(offer));
    }

    async findOne(id: number): Promise<Offer> {
        const offer = await this.entityManager.findOne(Offer, id);

        return (offer);
    }

    async update(offer: Offer): Promise<Offer> {
        return (await this.entityManager.save(offer));
    }

    async delete(offer: Offer): Promise<boolean> {
        const affected = await this.entityManager.delete(Offer, offer.id);

        return (affected.affected > 0);
    }

}