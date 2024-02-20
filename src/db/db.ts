import mongoose from 'mongoose';
import {DaySchema} from "./schemas/day.schema";
import {WeekSchema} from "./schemas/week.schema";
import {TaskSchema} from "./schemas/task.schema";
import {RepeatableTaskSchema} from "./schemas/repetable-task.schema";

export const initializeMongoDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/tasks');
    console.log("Db connected");
}
export const Day = mongoose.model('Day', DaySchema);
export const Week = mongoose.model('Week', WeekSchema);
export const RepeatableTask = mongoose.model('RepeatableTask', RepeatableTaskSchema);


