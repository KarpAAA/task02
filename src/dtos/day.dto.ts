import {TaskDTO} from "./task.dto";
import {WakeUpTimeDTO} from "./wake-up-time.dto";
import {HabitDTO} from "./habit.dto";


export interface DayDTO {
    date: string,
    tasks?: TaskDTO[],
    wakeUpTime?: WakeUpTimeDTO,
    habits?: HabitDTO[]
}