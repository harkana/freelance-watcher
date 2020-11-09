import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Parse404Works } from "./404works";
import { ParseFiverr } from "./fiverr";
import ParseFreelanceInformatique from "./freelance-informatique";
import ParseKicklox from "./kicklox";

const arr = [
    Parse404Works,
    ParseKicklox,
    ParseFreelanceInformatique,
    ParseFiverr
];

dotenv.config();

console.log(__dirname);

const opts: PostgresConnectionOptions = {
    name: "app",
    type: "postgres",
    url: process.env.DB_URL,
    entities: [
        `${__dirname}/../models/**/*.ts`
    ],
    migrations: [
        `${__dirname}/../migrations/**/*.ts`
    ]
};

createConnection(opts).then(async (conn) => {
    await conn.runMigrations({
        transaction: "all"
    });
    arr.forEach(async (item) => {
        await (new item().bootstrap());
    })
}).catch((error) => {
    console.log(error);
    console.log(`The server can't start: ${JSON.stringify(error)}`);
});