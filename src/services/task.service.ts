import {calculationHelper} from "../utils/calculation.helper";
import taskRepository from "../repositories/task.repository";
import {TaskDTO} from "../dtos/task.dto";

const MIN_MATCHES = 3;

function TaskService() {
    const getTaskByName = async (name: string) =>{
        let tasks = await taskRepository.getTasksByName(name);
        if (typeof tasks !== "string") {
            tasks = tasks.map(task => {
                const {name, ...rest} = task;
                return rest;
            });
        }
        const [maxValues, values] =
            calculationHelper.findSumOfFields(tasks, "maxValue", "value");
        const done = calculationHelper.findCompletionPercent(values, maxValues)
        const task = { name }
        return {task, occurrence: tasks, maxValues, values, done};
    }
    const updateTask = (id: number, taskParams: TaskDTO) =>{
        const fieldsToUpdate = {};
        console.log(taskParams);
        Object.keys(taskParams).forEach(key => {
            fieldsToUpdate[`tasks.$.${key}`] = taskParams[key];
        })

        return taskRepository.updateTask(id, fieldsToUpdate);
    }

    const autocompleteTask = async (taskName: string) => {
        const results = await taskRepository.findRepetableTask(taskName);
        if(results.length < MIN_MATCHES) return "No matches found";

        return results;
    }

    return {
        getTaskByName,
        updateTask,
        autocompleteTask
    }

}

const taskService = TaskService();
export default taskService;