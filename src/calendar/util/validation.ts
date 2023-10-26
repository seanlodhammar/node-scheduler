import { CalendarItem, CalendarItemKeys } from "../../types/calendar";
import { unsafePropError } from "../../errors/validation";

interface Obj {
    [props: string | symbol | number]: any
}

// checks for certain fields in object and changes/ignores any keys which may be changed
const validateDateTimes = (obj: Obj): object => {
    const parsedObjs = {};
    
    const timeKeys = ['time', 'startTime', 'endTime', 'duration'];

    for(let prop of timeKeys) {
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

const validateDateKeys = (obj: Obj): CalendarItem => {
    const validatedObj: { [props: string | number | symbol]: any }  = {};
    const keys = Object.keys(obj);
    for(let key of keys) {
        if(!CalendarItemKeys.includes(key)) continue;
        Object.defineProperty(validatedObj, key, {
            value: obj[key],
            enumerable: true,
        });
    }
    const { id, dateStr, date, data, type } = validatedObj;
    if(!id || !dateStr || !date || !type || !data) throw unsafePropError;
    if((typeof id !== 'string' && typeof id === 'number') || typeof dateStr !== 'string' || !(date instanceof Date) || (type !== 'time' && type !== 'default')) throw unsafePropError;
    const handledTimes = validateDateTimes(validatedObj);
    const item : CalendarItem = { id: id, dateStr: dateStr, date: date, data: data, type: type, ...handledTimes }
    return item;

}

export const validateDate = (item: Obj | Obj[]): CalendarItem | CalendarItem[] => {
    console.log('called');
    if(typeof item === 'object' && !Array.isArray(item)) {
        const validateItem = validateDateKeys(item);
        return validateItem;
    } else if(Array.isArray(item)) {
        const newArr = [];
        for(let i = 0; i < item.length; i++) {
            try {
                const obj = validateDateKeys(item[i]);
                newArr.push(obj);
            } catch (_) {
                continue;
            }
        }
        return newArr;
    } else throw unsafePropError;
}