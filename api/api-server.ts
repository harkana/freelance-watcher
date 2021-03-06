import express from "express";
import { readFileSync } from "fs";
import { absolutePath } from "swagger-ui-dist"
import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { container } from "./container";

export default class ApiServer {

    port: number;
    host: string;

    app: express.Application;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.config()
    }

    config() {
        this.app = express();

        this.app.use(require("body-parser").json());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
            res.setHeader("Access-Control-Allow-Headers", "Accept,Content-Type");
            next();
        });
        this.app.use("/", express.static("App"));

        this.mount();
    }

    mount() {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const routes = [
                "/about",
                "/",
                "/settings"
            ];
            const filtered = routes.filter((route) => route == req.path);

            if (filtered.length == 1) {
                res.end(readFileSync("./App/index.html"));
            }
            else {
                next();
            }
        });
        this.app.get("/", (req: express.Request, res: express.Response) => {
            res.end(readFileSync('./App/index.html'));
        });
        (container.resolve('registerRoutes') as Function)(this.app);
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (err.status == 400) {
                console.log(err);
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
            }).end(readFileSync(`./build/swagger.json`, {
                encoding: 'utf8'
            }));
        });
        this.app.use('/swagger', express.static(absolutePath()));
    }

    start() {
        const opts: PostgresConnectionOptions = {
            name: "app",
            type: "postgres",
            url: process.env.DB_URL,
            entities: [
                `${__dirname}/models/**/*.ts`,
                `${__dirname}/models/**/*.js`
            ],
            migrations: [
                `${__dirname}/migrations/**/*.ts`,
                `${__dirname}/migrations/**/*.js`
            ]
        };

        createConnection(opts).then(async (conn) => {
            await conn.runMigrations({
                transaction: "all"
            });
            this.app.listen(this.port, this.host, () => {
                console.log(`The server runs at http://${this.host}:${this.port}`);
            });
        }).catch((error) => {
            console.log(error);
            console.log(`The server can't start: ${JSON.stringify(error)}`);
        });
    }

}