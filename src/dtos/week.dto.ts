import {TaskDTO} from "./task.dto";
import {HabitDTO} from "./habit.dto";


export interface WeekDTO {
    start: string
    tasks: TaskDTO[],
    habits?: HabitDTO[]
}