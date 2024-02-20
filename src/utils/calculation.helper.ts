import {TaskDTO} from "../dtos/task.dto";

function CalculationHelper() {
    const sumTasksField = (tasks, filed: string) =>{
        return tasks.map(task => task[filed]).reduce((prev, current) => prev + current, 0) || 0;
    }

    const findCompletionPercent = (completed: number, all: number) =>{
        let percent = +(completed / all * 100).toFixed(1);
        if (completed == 0 && all == 0) percent = 100;
        return percent;
    }
    const findSumOfFields = (tasks, ...fields: string[]) =>{
        return fields.map(field => sumTasksField(tasks, field));
    }
    return {
        findCompletionPercent,
        findSumOfFields
    }
}

export const calculationHelper = CalculationHelper();