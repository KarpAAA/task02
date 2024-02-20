import mongoose from "mongoose";
import {TaskSchema} from "./task.schema";
import {WakeUpTimeSchema} from "./wake-up-time.schema";
import {HabitsSchema} from "./habits.schema";
const dateRegex = /\d{2}\.\d{2}\.\d{4}/;


export const DaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function (value: string){
                return dateRegex.test(value);
            },
            message: props => `incorrect date format should be in format [${dateRegex}] `
        }
    },
    tasks: {
        type: [TaskSchema],
        required: false,

        validate: [
            {
                validator: function (tasks: any[]) {
                    const names = tasks.map(task => task.name);
                    const uniqueNames = new Set(names);
                    return uniqueNames.size === tasks.length;
                },
                message: props => `Task names must be unique within the array`
            }
        ]

    },
    wakeUpTime: {
        type: WakeUpTimeSchema,
        required: false
    },
    habits: {
        type: [HabitsSchema],
        validate: [
            {
                validator: function (habits: any[]) {
                    const names = habits.map(habit => habit.name);
                    const uniqueNames = new Set(names);
                    return uniqueNames.size === habits.length;
                },
                message: props => `Task names must be unique within the array`
            }
        ],
        required: false
    }
});
