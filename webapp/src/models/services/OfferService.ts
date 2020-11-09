import axios from "axios";
import { OfferResource, OffersPaginate, QueryPagination } from '..';

export class OfferService {

    host: string;

    constructor() {
        this.host = process.env.VUE_APP_HOST;
    }

    async findAll(query: QueryPagination, filters: Array<string>): Promise<OffersPaginate> {
        let url = `${this.host}/api/offer?cPage=${Number(query.cPage - 1)}&perPage=${query.perPage}`;
        if (filters.length){
            url = `${url}&filters=${filters.join(',')}`
        }
        const response = await axios.get(url);
        const data = response.data;

        return (data);
    }

}