import express from "express";
import { RegisterRoutes } from "./build/routes"
import fs from "fs";
import { absolutePath } from "swagger-ui-dist"

export default class ApiServer {

    port: number;
    host: string;

    app: express.Application

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.config()
    }

    config() {
        this.app = express();

        this.app.use(require("body-parser").json());
        this.mount();
    }

    mount() {
        RegisterRoutes(this.app);
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (err.status == 400) {
                const fields: { [key: string]: { message: string; value: any } } = err.fields;
                const arr = [];

                for (let key in fields) {
                    arr.push(fields[key].message);
                }
                res.status(err.status).json({
                    httpCode: err.status,
                    message: arr
                })
            }
            next();
        });
        this.app.get('/swagger.json', (req, res) => {
            res.set({
                'Content-Type': 'application/json; charset=UTF-8'
            }).end(fs.readFileSync(`./build/swagger.json`, {
                encoding: 'utf8'
            }));
        });
        this.app.use('/swagger', express.static(absolutePath()));
    }

    start() {
        this.app.listen(this.port, this.host, () => {
            console.log(`The server runs at http://${this.host}:${this.port}`);
        });
    }

}