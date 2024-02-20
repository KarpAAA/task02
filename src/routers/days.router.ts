import express from "express";
import dayController from "../controllers/days.controller";

const router = express.Router();

router.get("/",dayController.getDay)
router.get("/range",dayController.getDaysInRange)
router.patch("/",dayController.updateDay)


export const dayRouter = router;

