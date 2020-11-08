import { Freelance } from "../parsing/Freelance";
import express from "express";
import dotenv from "dotenv";
import schedule from "node-schedule";

dotenv.config({
    path: "../.env"
});

const app = express();

const schedulerUID: Array<string> = [];

app.get('/start_scheduler', (req: express.Request, res: express.Response) => {
    let name: string = req.query.platformName as string;
    const uid = new Date().getTime().toString(34);

    schedulerUID.push(uid);
    schedule.scheduleJob(uid, {
        rule: "*/10 * * * *"
    }, async () => {
        const freelance = new Freelance();

        if (name) {
            freelance.setSelectedPlatform(name);
        }
        await freelance.bootstrap();
    });
    res.json({
        uid: uid
    });
});

app.get('/stop_scheduler/:uid', (req: express.Request, res: express.Response) => {
    let flag = false;

    for (let s of schedulerUID) {
        if (s === req.params.uid) {
            flag = true;
            schedule.cancelJob(s);
        }
    }
    if (flag) {
        res.json({
            message: "Scheduler stopped"
        });
    }
    else {
        res.json({
            message: "Scheduler not found"
        });
    }
});

app.listen(process.env.LISTEN_CRON_SERVER_PORT, () => {
    console.log(`The server is started at ${process.env.LISTEN_CRON_SERVER_PORT}`);
});