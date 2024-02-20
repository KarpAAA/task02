import daysRepository from "../repositories/days.repository";
import {DayDTO} from "../dtos/day.dto";
import {TaskDTO} from "../dtos/task.dto";
import {calculationHelper} from "../utils/calculation.helper";
import {dateHelper} from "../utils/date.helper";
import {HabitDTO} from "../dtos/habit.dto";

function DaysService() {
    const createNewDay = (dayParams: DayDTO) => {
        const day: DayDTO = {...dayParams};
        return daysRepository.createDay(day);
    }

    const getDay = async (date: string) =>  {
        const day = await daysRepository.getDay(date);
        if (!day) throw new Error("Day not found!");


        const [sumOfMaxValuesFromAllTasks, sumOfValues] =
            calculationHelper.findSumOfFields(day.tasks, "maxValue", "value");
        let percentsOfDone = calculationHelper.findCompletionPercent(sumOfValues, sumOfMaxValuesFromAllTasks)

        const habitsMax = day?.habits?.length ?? 0;
        const habitsValues = day?.habits?.filter(habit => habit.value === 1).length ?? 0;
        let habitsDone = calculationHelper.findCompletionPercent(habitsValues, habitsMax)

        let percentOfDone: number = (Math.floor(habitsDone) + dateHelper.calculateSuccessValue(day.wakeUpTime)) / 3;
        if(checkIfWasProgressToday(day)){
            percentOfDone += Math.ceil(percentsOfDone) / 3;
        }
        else {
            percentOfDone += Math.floor(percentsOfDone) / 3;
        }

        return {
            day,
            sumOfMaxValuesFromAllTasks,
            sumOfValues,
            habitsMax,
            habitsValues,
            percentsOfDone: percentOfDone + "%"
        };
    }

    const checkIfWasProgressToday = (today) => {
        if(!today.tasks || today.tasks.length === 0) return false;
        return today.tasks
            .filter(task => task != undefined && task.updatedAt != undefined)
            .map(task => task.updatedAt)
            .filter(date => dateHelper.compareTwoDates(date, new Date()) === 0)
            .length > 0;
    }
    const getDaysInRange = async (startDate: string, endDate: string)=> {
        const dateFrom: Date = dateHelper.getDateFromString(startDate);
        const dateTo: Date = dateHelper.getDateFromString(endDate);

        if (dateFrom.getTime() > dateTo.getTime()) throw new Error('Start date must be less than end date');
        const daysInRange = dateHelper.getDatesFromRange(dateFrom, dateTo);
        const resArray: any[] = [];
        for (const date of daysInRange) {
            resArray.push(await getDay(dateHelper.formatDate(date)));
        }
        return resArray;
    }

    const updateDay = async (dayParams: DayDTO) => {
        const day = await daysRepository.getDay(dayParams.date);
        if (!day) throw new Error('Day not found');

        if (dayParams.wakeUpTime) {
            day.wakeUpTime =
                {
                    ...(day.wakeUpTime ?? {})
                    , ...dayParams.wakeUpTime
                }
        }
        if (dayParams?.habits?.length ?? 0 > 0) {
           updateDayHabits(day, dayParams.habits);
        }
        if (dayParams?.tasks?.length ?? 0 > 0) {
            updateDayTasks(day, dayParams.tasks);
        }
        return daysRepository.updateDay(day);
    }

    const updateDayHabits =  (day, habits?: HabitDTO[]) => {
        habits?.forEach(habit => {
            if (habit._id) {
                let foundHabit =
                    day?.habits?.find(h => {
                        return h._id == habit._id
                    });
                console.log(foundHabit);
                if (foundHabit) {
                    for (const [key, value] of Object.entries(habit)) {
                        foundHabit[key] = value;
                    }
                }
            } else {
                day.habits?.push(habit)
            }
        });
    }
    const updateDayTasks =  (day, tasks?: TaskDTO[]) => {
        tasks?.forEach(task => {
            if (task._id) {
                let foundTask =
                    day?.tasks?.find(t => {
                        return t._id == task._id
                    });
                if (foundTask) {
                    task.updatedAt = new Date();
                    for (const [key, value] of Object.entries(task)) {
                        foundTask[key] = value;
                    }
                }
            } else {
                day.tasks?.push(task)
            }

        });
    }
    return {
        createNewDay,
        getDaysInRange,
        getDay,
        updateDay
    }
}

const daysService = DaysService();
export default daysService;