import ApiServer from "./api-server";
import { config } from "dotenv";

config();

export function start(){
    const apiServer = new ApiServer(process.env.LISTEN_HOST, Number(process.env.LISTEN_PORT));

    apiServer.start();
}
