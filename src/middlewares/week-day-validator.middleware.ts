import {dateHelper} from "../utils/date.helper";

export const weekDayValidatorMiddleware = (req, res, next) => {
    const dateString = req.body.start;
    if (!dateString) throw new Error("Empty start date string");
    const date = dateHelper.getDateFromString(dateString);
    if (date.getDay() !== 1) throw new Error("Not monday!")

    next();
};
export const afterController = (req, res, next) => {

    res.on('finish', () =>{
        console.log("afterController");
    })

    next();
};



