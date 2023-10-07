import { getAllMonths, days, isLeapYear } from "./util";

export const getDate = (date: string, config: 'eu' | 'us') => {
    const split = date.split('/');
    const dateArr : number[] = [];
    split.forEach((element, _) => {
        const elInt = parseInt(element);
        if(!elInt || isNaN(elInt)) {
            return false;
        }
        dateArr.push(elInt);
    })
    if(dateArr.length < 3 || dateArr.length > 3) {
        return false;
    }
    if(dateArr.length === 3) {
        const day = dateArr[0];
        const month = dateArr[1];
        const year = dateArr[2];

    if(month > 12 || month < 1) {
        return false;
    }
    
    if(year.toString().length <= 1 || year.toString().length > 4) {
        return false;
    }
    let dayStr = day.toString();
    let monthStr = month.toString();
    if(day.toString().length === 1) {
        dayStr = `0${day}`;
    };
    if(month.toString().length === 1) {
        monthStr = `0${month}`;
    }

    let param = '';
    const yearStr = `${year.toString().length === 4 ? year : ''}${year.toString().length === 2 ? `20${year}`: ''}`;
    if(config === 'eu') {
        param = `${yearStr}-${monthStr}-${dayStr}T00:00:00`;
    } else if(config === 'us') {
        param = `${yearStr}-${dayStr}-${monthStr}`;
    } else {
        return false;
    }

    const data = new Date(param);
    const isValid = Date.parse(param);

    if(isNaN(isValid)) {
        return false;
    }

    const months = getAllMonths(yearStr);

    const dayDate = data.getDate();
    const dayName = days[data.getDay()];
    const monthDate = data.getMonth();
    const monthObj = months[monthDate];
    const monthName = monthObj.name;
    const yearDate = data.getFullYear();
    const yearDateStr = yearDate.toString();
    const localeDateStr = data.toLocaleDateString();

    if(month !== monthDate + 1) {
        return false;
    }

    return { month: { name: monthName, date: monthDate + 1 }, day: { name: dayName, date: dayDate }, year: yearDate, date: data, dateStr: localeDateStr, leap: isLeapYear(yearDateStr) };
}
}