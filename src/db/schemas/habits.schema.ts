import mongoose from "mongoose";


export const HabitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value : {
        type: Number,
        validate: [
            {
                validator: function (value: number) {
                    return value === 0 || value === 1 || false;
                },
                message: props => `Task names must be unique within the array`
            }
        ],
        default: 0
    }
});