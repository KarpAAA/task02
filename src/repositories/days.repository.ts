import {Day as DaySchema, RepeatableTask} from "../db/db";
import {DayDTO} from "../dtos/day.dto";
import {HabitDTO} from "../dtos/habit.dto";

function DaysRepository() {
    const createDay = async (day: DayDTO) => {
        const newDay = new DaySchema({...day});
        await newDay.save();
        return newDay;
    }

    const getDay = (date: string) => {
        return DaySchema.findOne({date}).exec();
    }

    const getDayByDate = (date: string) => {
        return DaySchema.findOne({date}).exec();
    }


    const updateDay = async (day) => {
        await day.save();
        return day;
    }

    const updateWakeUpTime = async (date: string, wakeUpParams: any) => {
        const fieldsToUpdate = {};

        Object.keys(wakeUpParams).forEach(key => {
            fieldsToUpdate[`wakeUpTime.${key}`] = wakeUpParams[key];
        })

        return DaySchema.findOneAndUpdate(
            {date},
            {$set: fieldsToUpdate},
            {new: true}
        )
    }

    const updateHabit = async (day, habitDTO: HabitDTO) => {
        return await DaySchema.findOneAndUpdate(
            {"date": day.date, "habits.name": habitDTO.name},
            {"$set": {"habits.$.value": habitDTO.value}},
            {new: true}
        ).exec();

    }

    const createNewHabit = async (day, habit: HabitDTO) => {
        day.habits.push(habit);
        await day.save();
        return day;
    }

    return {
        createDay,
        getDay,
        getDayByDate,
        updateDay,
        updateWakeUpTime,
        updateHabit,
        createNewHabit
    }
}

const daysRepository = DaysRepository();

export default daysRepository;