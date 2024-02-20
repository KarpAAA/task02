import mongoose from "mongoose";

export const RepeatableTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxValue: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        default: 0,
    },
    notes:{
        type: String,
        default: "Empty"
    }
});