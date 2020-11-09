import axios from "axios";
import { KeywordsResource } from '..';

export class KeywordService {

    host: string;

    constructor() {
        this.host = process.env.VUE_APP_HOST;
    }

    async findAll(): Promise<Array<KeywordsResource>> {
        const response = await axios.get(`${this.host}/api/cronTaskKeywords`);
        const data = response.data;

        return (data);
    }

    async update(keywords: KeywordsResource) {
        const response = await axios.put(`${this.host}/api/cronTaskKeywords`, keywords, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.data;

        return (data);
    }

    async save(keywords: KeywordsResource) {
        const response = await axios.post(`${this.host}/api/cronTaskKeywords`, keywords, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.data;

        return (data);
    }

    async delete(id: number) {
        const response = await axios.delete(`${this.host}/api/cronTask/${id}`);
        const data = response.data;

        return (data);
    }

}