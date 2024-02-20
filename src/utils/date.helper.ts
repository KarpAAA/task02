import {WakeUpTimeDTO} from "../dtos/wake-up-time.dto";

function DateHelper() {
    const getDateFromString = (dateString): Date => {
        const [day, month, year] = dateString.split('.').map(Number);
        return new Date(year, month - 1, day);
    }

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const getWeekOfTheYear = (date: string) => {
        const now = getDateFromString(date);
        const onejan = new Date(now.getFullYear(), 0, 1);
        return Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    }

    const calculateSuccessValue = (wakeUpTime: WakeUpTimeDTO | null | undefined) => {
        if (!wakeUpTime) return 100;
        const [startTime, endTime] = wakeUpTime.timeRange.split('-');

        const startInMinutes = getDateInMinutes(parseTime(startTime));
        const endInMinutes = getDateInMinutes(parseTime(endTime));
        const wakeUpInMinutes = getDateInMinutes(parseTime(wakeUpTime.time));


        return 100 - findPercentage(startInMinutes, endInMinutes, wakeUpInMinutes);
    }

    const findPercentage = (min: number, max: number, curr: number) => {
        const range = max - min;
        const difference = curr - min;
        return (difference / range) * 100;
    }

    const parseTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date;
    }

    const getDateInMinutes = (date: Date) => {
        return date.getHours() * 60 + date.getMinutes();
    }

    const getDatesFromRange = (startDate: Date, stopDate: Date) => {
        let dateArray: Date[] = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDaysToDate(currentDate, 1);
        }
        return dateArray;
    }

    const addDaysToDate = (date: Date, days: number) => {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    const compareTwoDates = (date1: Date, date2: Date) => {
        const year1 = date1.getFullYear();
        const month1 = date1.getMonth();
        const day1 = date1.getDate();

        const year2 = date2.getFullYear();
        const month2 = date2.getMonth();
        const day2 = date2.getDate();

        if (year1 === year2 && month1 === month2 && day1 === day2) {
            return 0; // Dates are equal
        } else if (year1 > year2 || (year1 === year2 && month1 > month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
            return 1; // date1 is later than date2
        } else {
            return -1; // date1 is earlier than date2
        }
    }
    return {
        getDateFromString,
        formatDate,
        getWeekOfTheYear,
        calculateSuccessValue,
        getDatesFromRange,
        compareTwoDates
    }
}

export const dateHelper = DateHelper();
