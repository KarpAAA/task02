import weekService from "../services/week.service";
import {Request, Response} from "express";
function WeekController() {
    const createWeek = async (req: Request, res: Response) => {
        try {
            const createdWeek = await weekService.createNewWeek(req.body);

            res.send(createdWeek);
        } catch (err: any) {
            console.error(err);
            res.send(err);
        }
    }

    const getWeek = async (req: Request, res: Response) => {
        try {
            const startWeekDay = req.query.start;
            if(!startWeekDay) throw new Error("Invalid start week time");
            const week = await weekService.getWeek(startWeekDay.toString());

            res.send(week);
        } catch (err: any) {
            res.send(err);
        }
    }

    const addTask = async (req: Request, res: Response) => {
        try {
            const {start} = req.query;
            if(!start) throw new Error("Invalid start task time");

            const { task } = req.body;

            const updatedWeek = await weekService.addTask(start.toString(), task);
            res.send(updatedWeek);
        } catch (err: any) {
            res.send(err);
        }

    }

    const getWeekOfTheYear = (req: Request, res: Response) => {
        try {
            const {date} = req.query;
            if (!date) throw new Error("Date should be passed");
            const weekOfTheYear = weekService.getWeekOfTheYear(date.toString());

            res.send(weekOfTheYear);
        } catch (err: any) {
            res.send(err);
        }
    }
    return {
        createWeek,
        getWeek,
        addTask,
        getWeekOfTheYear
    }
}

const weekController = WeekController();

export default weekController
