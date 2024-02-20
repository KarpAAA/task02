import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
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
    },
    updatedAt:{
        type: Date
    }
}, {
    autoIndex: true

});