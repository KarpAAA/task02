import taskService from "../services/task.service";
import {Request, Response} from "express";
function TaskController() {

    const getTaskByName = async (req: Request, res: Response) => {
        try {
            const {name} = req.query;
            if(!name) throw new Error("No name provided");

            const task = await taskService.getTaskByName(name.toString());
            res.send(task);
        } catch (err: any) {
            res.send(err);
        }
    }

    const updateTask = async (req: Request, res: Response) => {
        try {
            const {id} = req.query;
            if(!id) throw new Error("No id provided");
            const {task} = req.body;

            const updatedTask = await taskService.updateTask(Number(id), task);
            res.send(updatedTask);
        } catch (err: any) {
            res.send(err);
        }
    }

    const autocompleteTask = async (req: Request, res: Response) => {
        try {
            const {name} = req.query;
            if(!name) throw new Error("No task name provided");

            const autocompleteTaskResults = await taskService.autocompleteTask(name.toString());
            res.send(autocompleteTaskResults);
        } catch (err: any) {
            res.send(err);
        }
    }

    return {
        getTaskByName,
        updateTask,
        autocompleteTask
    }
}

const taskController = TaskController();

export default taskController
