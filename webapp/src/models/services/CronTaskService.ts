import axios from "axios";
import { CronTaskResource } from '..';

export class CronTaskService {

    host: string;

    constructor() {
        this.host = process.env.VUE_APP_HOST;
    }

    async findAll(): Promise<Array<CronTaskResource>> {
        const response = await axios.get(`${this.host}/api/cronTask`);
        const data = response.data;

        return (data);
    }

    async update(cronTask: CronTaskResource) {
        const response = await axios.put(`${this.host}/api/cronTask`, cronTask, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = response.data;

        return (data);
    }

    async save(cronTask: CronTaskResource) {
        const response = await axios.post(`${this.host}/api/cronTask`, cronTask, {
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