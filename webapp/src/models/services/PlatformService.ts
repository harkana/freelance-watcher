import axios from "axios";
import { PlatformResource } from '..';

export class PlatformService {

    host: string;

    constructor() {
        this.host = process.env.VUE_APP_HOST;
    }

    async findAll(): Promise<Array<PlatformResource>> {
        const response = await axios.get(`${this.host}/api/platform`);
        const data : Array<PlatformResource> = response.data;

        return (data);
    }

}