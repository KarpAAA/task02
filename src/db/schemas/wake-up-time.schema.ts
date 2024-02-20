import mongoose from "mongoose";

const timeFormatRegex = /\d{2}:\d{2}/; //("06:00")
const timeRangeFormatRegex = /\d{2}:\d{2}-\d{2}:\d{2}/; //("06:00-17:00")

export const WakeUpTimeSchema = new mongoose.Schema({
    expectedTime: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return timeFormatRegex.test(value)
            },
            message: props => `incorrect time format should be in format [${timeFormatRegex}] `

        }
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return timeFormatRegex.test(value)
            },
            message: props => `incorrect time format should be in format [${timeFormatRegex}] `
        }
    },
    maxValue: {
        type: Number,
        required: true,
    },
    timeRange: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return timeRangeFormatRegex.test(value)
            },
            message: props => `incorrect time-range format should be in format [${timeRangeFormatRegex}] `
        }
    }
});