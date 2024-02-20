import express, {json} from "express";
import bodyParser from "body-parser"
import {config} from "dotenv";
import {dayRouter} from "./routers/days.router";
import {initializeMongoDb} from "./db/db";
import {weekRouter} from "./routers/week.router";
import {taskRouter} from "./routers/task.router";


config()
const app = express()
const port = process.env.PORT || 3000;

(async () => {
    await initializeMongoDb();
    app.use(json())
    app.use(bodyParser.urlencoded({extended: false}));
    app.use('/days', dayRouter);
    app.use('/week', weekRouter);
    app.use('/task', taskRouter);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})()
