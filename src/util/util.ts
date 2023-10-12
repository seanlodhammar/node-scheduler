import { CalendarItem, CalendarItemTimeProps, CalendarObj } from "../types/calendar";

interface Dates {
    day: {
        str: string;
        int: number;
    }
    month: {
        str: string;
        int: number;
    }
    year: {
        str: string;
        int: number;
    };
    dateString: string;
}

export type DatesOrFalse = Dates | false;

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
export const separateDateAndParse = (date: string | Date, config: 'eu' | 'us'): DatesOrFalse => {
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
    let day;
    let month;
    let year;
    
    if(config === 'eu') {
        day = dateArr[0].int;
        month = dateArr[1].int;
    }
    if(config === 'us') {
        month = dateArr[0].int;
        day = dateArr[1].int;
    }

    if(!dateArr[2] || !dateArr[2].int || !dateArr[2].str) {
        year = yearDate.getFullYear();
        dateArr.push({ int: year, str: year.toString() })
    } else {
        year = dateArr[2].int;
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

// checks for certain fields in object and changes/ignores any keys which may be changed
const validateDateTimes = (obj: CalendarItem): object => {
    const parsedObjs = {};
    
    const timeKeys = ['time', 'startTime', 'endTime', 'duration'];

    for(let prop of timeKeys) {
        if(prop !== 'time' && prop !== 'startTime' && prop !== 'endTime' && prop !== 'duration') continue;
        const timeProperty = obj[prop];

        if(!timeProperty) continue;

        if(prop === 'duration' && 'hours' in timeProperty && 'minutes' in timeProperty) {
            if(timeProperty['hours'] === undefined || timeProperty['minutes'] === undefined) continue;

            let hours = timeProperty['hours'];
            let minutes = timeProperty['minutes'];

            if(typeof hours !== 'number') {
                hours = parseInt(hours);
            }
            if(typeof minutes !== 'number') {
                minutes = parseInt(minutes);
            }

            if(isNaN(hours) || isNaN(minutes)) continue;

            Object.defineProperty(parsedObjs, prop, {
                value: {
                    hours: hours,
                    minutes: minutes
                },
                enumerable: true,
                configurable: true,
                writable: true,
            })
            continue;
        } else if(prop !== 'duration' && 'str' in timeProperty && 'hour' in timeProperty && 'minute' in timeProperty) {
            let str = timeProperty['str'];
            let hour = timeProperty['hour'];
            let minute = timeProperty['minute'];

            if(typeof str !== 'string' || !str.includes(':')) continue;
            if(typeof hour !== 'number') {
                hour = parseInt(hour);
            }
            if(typeof minute !== 'number') {
                minute = parseInt(minute);
            }

            if(isNaN(hour) || isNaN(minute)) continue;

            Object.defineProperty(parsedObjs, prop, {
                value: {
                    str: str,
                    hour: hour,
                    minute: minute,
                },
                enumerable: true,
                configurable: true,
                writable: true,

            });
            continue;
        }
        continue;
    }
    
    return parsedObjs;
}


export const sanitizeCalendar = (calendar: { [props: string | number | symbol]: any }): CalendarObj => {
    const sanitizedCalendar : CalendarObj = {};
    const error = new Error('Calendar failed to be registered due to unsafe properties');

    if(!('items' in calendar)) throw error;

    const dateKeys = Object.keys(calendar.items);

    if(dateKeys.length < 1) {
        return {};
    }
    for(let dateKey of dateKeys) {
        const dateObj = calendar['items'][dateKey];
        const dateTimeKeys = Object.keys(dateObj);
        if(sanitizedCalendar[dateKey] === undefined || sanitizedCalendar[dateKey] === null) {
            Object.defineProperty(sanitizedCalendar, dateKey, {
               value: {},
               configurable: true,
               enumerable: true,
               writable: true,
            });
        }

        for(let dateTimeKey of dateTimeKeys) {
            const dateTime = dateObj[dateTimeKey];
            if(!dateTime) throw error;

            if(Array.isArray(dateTime)) {
                
            }
            
            const { id, dateStr, date, data, type } = dateTime;
            if(!id || !dateStr || !date || !type || !data) throw error;
            if((typeof id !== 'string' && typeof id === 'number') || typeof dateStr !== 'string' || !(date instanceof Date) || (type !== 'time' && type !== 'default')) throw error;
            // at this point, we've confirmed that this does have all of the required, correctly typed properties of CalendarItem
            const handledTimes = validateDateTimes(dateTime);
            const obj : CalendarItem = { id: id, dateStr: dateStr, date: date, data: data, type: type, ...handledTimes };
            if(sanitizedCalendar[dateKey][dateTimeKey] === undefined || sanitizedCalendar[dateKey][dateTimeKey] === null) {
                Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                    value: obj,
                    configurable: true,
                    writable: true,
                    enumerable: true,
                })
                continue;
            } else if(sanitizedCalendar[dateKey][dateTimeKey]) {
                const currentTimeObj = sanitizedCalendar[dateKey][dateTimeKey];
                if(!Array.isArray(currentTimeObj) && typeof currentTimeObj === 'object') {
                    Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                        value: [obj, currentTimeObj],
                        configurable: true,
                        writable: true,
                        enumerable: true,
                    });
                    continue;
                } else if(Array.isArray(currentTimeObj)) {
                    Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                        value: [obj, ...currentTimeObj]
                    })
                    continue;
                } else {
                    continue;
                }
            } else {
                continue;
            }

        }
    };

    return sanitizedCalendar;
}