import { Offer } from "../..";
import { OfferService } from "../OfferService";
import { EntityManager, getManager } from "typeorm";
import { QueryPagination } from "../../../resources";

export class OfferServiceImpl implements OfferService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
    }

    async count(): Promise<number> {
        const count = await this.entityManager.count(Offer);

        return (count);
    }

    async findAll(query: QueryPagination, filters: Array<string>): Promise<[Offer[], number]> {
        let sql = this.entityManager.createQueryBuilder(Offer, "offer").leftJoinAndSelect("offer.platform", "platform").skip(query.cPage * query.perPage).take(query.perPage);

        if (filters.length) {
            sql = sql.where("platform.name IN (:...filters)", { filters: filters });
        }
        const offers = await sql.getMany();
        let pagination = 0;
        if (filters.length) {
            pagination = await this.entityManager.createQueryBuilder(Offer, "offer").leftJoinAndSelect("offer.platform", "plt").where("plt.name IN (:...filters)", { filters: filters }).getCount();
        }
        else {
            pagination = await this.entityManager.createQueryBuilder(Offer, "offer").getCount();
        }
        return ([offers, pagination]);
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