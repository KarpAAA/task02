import mongoose from "mongoose";
import {TaskSchema} from "./task.schema";

const weekDayRegex = /\d{2}.\d{2}.\d{4}/;
export const WeekSchema = new mongoose.Schema({
    start: {
        type: String,
        unique: true,
        validate: {
            validator: function (value: string){
                return weekDayRegex.test(value);
            },
            message: params => `Incorrect week-day format should be like ${weekDayRegex}`
        }
    },
    tasks: [TaskSchema]
});