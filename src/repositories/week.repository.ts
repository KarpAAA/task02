import {Week as WeekSchema} from "../db/db";
import {WeekDTO} from "../dtos/week.dto";

function WeekRepository() {


    const createWeek = async (week: WeekDTO) => {
        const newWeek = new WeekSchema({...week});
        await newWeek.save();
        return newWeek;
    }

    const getWeek = (start: string) => {
        return WeekSchema.findOne({start}).exec();
    }

    const getWeekByDate = (start: string) => {
        return WeekSchema.findOne({start}).exec();
    }

    const updateWeek = async (week) => {
        await week.save();
        return week;
    }

    return {
        createWeek,
        getWeek,
        getWeekByDate,
        updateWeek
    }
}

const weekRepository = WeekRepository();

export default weekRepository;