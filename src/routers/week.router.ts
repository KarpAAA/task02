import express from "express";
import weekController from "../controllers/week.controller";
import {weekDayValidatorMiddleware} from "../middlewares/week-day-validator.middleware";

const router = express.Router();


router.post("/", weekDayValidatorMiddleware, weekController.createWeek);
router.get("/", weekController.getWeek)
router.get("/year", weekController.getWeekOfTheYear)
router.patch("/", weekController.addTask)

export const weekRouter = router;


