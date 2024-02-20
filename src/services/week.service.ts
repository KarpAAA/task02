import weekRepository from "../repositories/week.repository";
import {TaskDTO} from "../dtos/task.dto";
import {WeekDTO} from "../dtos/week.dto";
import daysService from "./days.service";
import {calculationHelper} from "../utils/calculation.helper";
import {dateHelper} from "../utils/date.helper";
import {HabitDTO} from "../dtos/habit.dto";

const DAY_IN_WEEK = 7;

function WeekService() {
    const createNewWeek = async (weekParams: WeekDTO) =>{

        const week: WeekDTO = {...weekParams};
        await saveWeekDaysToDb(week.start, weekParams.habits);

        return weekRepository.createWeek(week);
    }

    const getWeek = async (startWeekDay: string) => {
        const week = await weekRepository.getWeek(startWeekDay);
        if (!week) throw new Error("Week not found!");

        const [sumOfMaxValuesFromAllWeekTasks, sumOfWeekValues] =
            calculationHelper.findSumOfFields(week.tasks, "maxValue", "value");
        let percentsOfWeekDone =
            calculationHelper.findCompletionPercent(sumOfWeekValues, sumOfMaxValuesFromAllWeekTasks)

        const days = await getAllWeekDays(startWeekDay);
        const percentOfAllDays: number =
            days
                .map(day => Number(day.percentsOfDone.substring(0, day.percentsOfDone.length - 1)))
                .reduce((prev, curr) => prev + curr, 0) / 7;

        return {
            week: {
                ...(week.toObject()),
                sumOfMaxValuesFromAllWeekTasks,
                sumOfWeekValues,
                weekTasksProgress: percentsOfWeekDone,
                generalWeekProgress: (percentsOfWeekDone + percentOfAllDays) / 2,
                weekOfTheYear: getWeekOfTheYear(startWeekDay)
            },
            days
        };
    }

    const addTask = async (weekStartDate: string, task: TaskDTO) => {
        const week = await weekRepository.getWeekByDate(weekStartDate)
        if (!week) {
            console.error('Week not found');
            return;
        }
        task.updatedAt = new Date();
        week.tasks?.push(task);
        return weekRepository.updateWeek(week)
    }


    const saveWeekDaysToDb =  async (start: string, habitsParams?: HabitDTO[]) => {
        const dateObject = dateHelper.getDateFromString(start);

        for (let i = 0; i < DAY_IN_WEEK; ++i) {

            await daysService.createNewDay({
                date: dateHelper.formatDate(dateObject),
                habits: habitsParams
            });
            dateObject.setDate(dateObject.getDate() + 1);
        }
    }


    const getAllWeekDays = async (start: string) =>{
        let days: any[] = [];
        const dateObject = dateHelper.getDateFromString(start);

        for (let i = 0; i < DAY_IN_WEEK; ++i) {
            const dayDTO = await daysService.getDay(dateHelper.formatDate(dateObject));
            days.push({...dayDTO});
            dateObject.setDate(dateObject.getDate() + 1);
        }

        return days;
    }

    const getWeekOfTheYear = (date: string) => {
        const result = {
            weekOfTheYear: dateHelper.getWeekOfTheYear(date).toString()
        };
        const dateObject = dateHelper.getDateFromString(date);
        const maxDate = new Date(dateObject.getFullYear(), 11, 25);
        if(dateObject > maxDate){
            result.weekOfTheYear = result.weekOfTheYear + "/1";
        }
        return result;
    }

    return {
        createNewWeek,
        getWeek,
        addTask,
        getWeekOfTheYear
    }
}

const weekService = WeekService();
export default weekService;