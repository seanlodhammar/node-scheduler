import { getAllMonths, days, isLeapYear, separateDateAndParse, DatesOrFalse } from "./util";
import { GetDateUtil as GetDate } from "../types/calendar";

export const getDate = (date: string | Date, config: 'eu' | 'us'): GetDate | false => {
    if(!date) return false;
    const dates = separateDateAndParse(date, config);

    if(!dates) return false;

    const { day, month, year } = dates;

    const param = `${year.str}-${month.str}-${day.str}T00:00:00`;;

    const data = new Date(param);
    const isValid = Date.parse(param);

    if(isNaN(isValid)) {
        return false;
    }

    const months = getAllMonths(year.str);

    const dayDate = data.getDate();
    const dayName = days[data.getDay()];
    const monthDate = data.getMonth();
    const monthObj = months[monthDate];
    const monthName = monthObj.name;
    const yearDate = data.getFullYear();
    const yearDateStr = yearDate.toString();
    const localeDateStr = data.toLocaleDateString();

    if(month.int !== monthDate + 1) {
        return false;
    }

    return { month: { name: monthName, date: monthDate + 1 }, day: { name: dayName, date: dayDate }, year: yearDate, date: data, dateStr: localeDateStr, leap: isLeapYear(yearDateStr) };
}
