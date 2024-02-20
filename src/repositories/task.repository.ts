import {Day as DaySchema, RepeatableTask as RepeatableTaskSchema} from "../db/db";
import {TaskDTO} from "../dtos/task.dto";

function TaskRepository() {

    const getTasksByName = async (name: string) => {
        const tasks = await DaySchema.aggregate([
            {$unwind: "$tasks"},
            {$match: {"tasks.name": name}},
            {$addFields: { "tasks.date": "$date" } },
            {$replaceRoot: {newRoot: "$tasks"}}
        ]).exec();
        if (!tasks || tasks.length === 0) return "Tasks not found";

        return tasks;
    }

    const updateTask = async (taskId: number, taskParams) => {
        taskParams = {...taskParams, updatedAt: Date.now()};
        const day = await DaySchema.findOneAndUpdate(
            {"tasks._id": taskId},
            {$set: taskParams},
            {new: true});

        if (!day) return "Task not found";
        return day;
    }

    const findRepetableTask = async (taskName: string) => {
        const regex = new RegExp(`.*${taskName}.*`);
        return await RepeatableTaskSchema.aggregate([
            {$match: {"name": regex}}
        ]).exec();
    }
    return {
        getTasksByName,
        updateTask,
        findRepetableTask
    }
}

const taskRepository = TaskRepository();

export default taskRepository;
