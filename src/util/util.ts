import { DateFormat, DatesOrFalse } from "../types/util";
import { invalidDateFormat } from "../errors/util";

export const isLeapYear = (year?: string): boolean =>  {
    const yearStr = year || '';
    const digits = parseInt(new Date(yearStr).getFullYear().toString().slice(2));
    if(digits % 4 === 0) {
        return true;
    }
    return false;
}

export const getAllMonths = (year?: string) => {
    let yearStr = ''
    if(year) {
        yearStr = `${year.toString().length === 4 ? year : ''}${year.toString().length === 2 ? `20${year}`: ''}`;
    }
    const months = [{ name: 'January', days: 31 }, { name: 'February', days: isLeapYear(yearStr) ? 29 : 28 }, { name: 'March', days: 31 }, { name:'April', days: 30 }, { name:'May', days: 31 }, { name:'June', days: 30 }, { name: 'July', days: 31 }, { name: 'August', days: 31 }, { name: 'September', days: 30 }, { name:'October', days: 31 }, { name: 'November', days: 30 }, { name: 'December', days: 31 }];
    return months;
}

const formatTimeStr = (time: string) => {
    if(!time.includes(':')) return false;
    const timeSplit = time.split(':');
    const hoursParse = parseInt(timeSplit[0]);
    const minutesParse = parseInt(timeSplit[1]);
    if(isNaN(hoursParse) || isNaN(minutesParse)) return false;
    if(hoursParse < 0 || hoursParse > 23 || minutesParse < 0 || minutesParse > 59) return false;

    let hoursStr = timeSplit[0];
    if(hoursStr.length === 1) {
        hoursStr = `0${hoursStr}`;
    }

    let minutesStr = timeSplit[1];
    if(minutesStr.length === 1) {
        minutesStr = `0${minutesStr}`;
    };

    if(hoursStr.length > 2 || minutesStr.length > 2 || minutesStr.length <= 1 || hoursStr.length <= 1) return false;

    const timeStr = `${hoursStr}:${minutesStr}`;
    return timeStr;
}

// date in form of 10/12/23 or 10/12/2023
// Not working with new "config" param
export const separateDateAndParse = (date: string | Date, config: DateFormat): DatesOrFalse => {
    let dateStr = '';
    if(date instanceof Date) {
        dateStr = date.toLocaleDateString();
    } else {
        dateStr = date;
    }
    const split = dateStr.split('/');
    const dateArr : { int: number; str: string; }[] = [];
    split.forEach((element, _) => {
        const elInt = parseInt(element);
        if(!elInt || isNaN(elInt)) {
            return false;
        }
        dateArr.push({ int: elInt, str: element });
    });

    const yearDate = new Date();

    const months = getAllMonths();

    const day = dateArr[config.day].int;
    const month = dateArr[config.month].int;

    let year;


    if(!dateArr[config.year] || !dateArr[config.year].int || !dateArr[config.year].str || dateArr[config.year].str.length !== 4) {
        year = yearDate.getFullYear();
        dateArr.push({ int: year, str: year.toString() })
    } else {
        year = dateArr[config.year].int;
    }

    if(!month || !day || !year) {
        return false;
    }

    if(dateArr.length < 3 || dateArr.length > 3) return false;

    const monthObj = months[month - 1];
    if(!monthObj || month > 12 || month < 1) return false;
    if(monthObj.days < day || day < 1) return false;

    let dayStr = day.toString();
    let monthStr = month.toString();

    if(dayStr.length === 1) {
        dayStr = `0${day}`;
    }

    if(monthStr.length === 1) {
        monthStr = `0${month}`;
    };

    let yearStr = dateArr[2].str;

    if(yearStr.length === 2) {
        const strPrefix = yearDate.getFullYear().toString().slice(0, 2);
        yearStr = `${strPrefix}${yearStr}`;
    }

    if(yearStr.length !== 4) {
        return false;
    }

    const dateString = `${day}/${month}/${yearStr}`;

    return { day: { str: dayStr, int: day }, month: { str: monthStr, int: month }, year: { str: yearStr, int: parseInt(yearStr) }, dateString: dateString };
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const handleDateFormat = (format: string): DateFormat | false => {
    console.log(format);
    if(!format.includes('-')) return false;
    const split = format.split('-');
    if(split.length !== 3) return false;
    
    const dayIndex = split.indexOf('dd');
    const monthIndex = split.indexOf('mm');
    const yearIndex = split.indexOf('yyyy');

    if(dayIndex === -1 || monthIndex === -1 || yearIndex === -1) return false;

    return { day: dayIndex, month: monthIndex, year: yearIndex };

}