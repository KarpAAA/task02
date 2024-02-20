import express from "express";
import dayController from "../controllers/days.controller";
import taskController from "../controllers/task.controller";

const router = express.Router();

router.get("/", taskController.getTaskByName)
router.patch("/", taskController.updateTask)
router.get("/autocomplete", taskController.autocompleteTask)

export const taskRouter = router;
