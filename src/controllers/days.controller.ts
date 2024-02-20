import daysService from "../services/days.service";
import {DayDTO} from "../dtos/day.dto";
import {ResponseWrapper} from "../dtos/response.wrapper";
import {Request, Response} from "express";

function DaysController() {

    const getDay = async (req: Request, res: Response) => {
        const result = new ResponseWrapper(res);
        try {
            const date = req.query.date;
            if(!date) throw new Error("Invalid date");
            const day = await daysService.getDay(date.toString())
            return result.send(200, day)
        } catch (err: any) {
            console.log(err);
            res.send(err);
        }
    }


    const getDaysInRange = async (req: Request, res: Response) => {
        try {
            const {start, end} = req.query;
            if(!start || !end) throw new Error("Invalid start or end range dates");
            const daysInRange = await daysService.getDaysInRange(start.toString(), end.toString());
            res.send(daysInRange);
        } catch (err: any) {
            console.error(err);
            res.send(err);
        }
    }


    const updateDay = async (req: Request, res: Response) => {
        try {
            const day: DayDTO = req.body;

            const updatedDay = await daysService.updateDay(day);
            res.send(updatedDay);
        } catch (err: any) {
            console.error(err);
            res.send(err);
        }
    }

    return {
        getDay,
        getDaysInRange,
        updateDay
    };
}

const dayController = DaysController();

export default dayController
