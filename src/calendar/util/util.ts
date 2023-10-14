import { validateDate } from "./validation";
import { unsafePropError } from "../../errors/validation";
import { CalendarObj } from "../../types/calendar";

export const sanitizeCalendar = (calendar: { [props: string | number | symbol]: any }): CalendarObj => {
    const sanitizedCalendar : CalendarObj = {};
    
    if(!('items' in calendar)) throw unsafePropError;

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
            if(!dateTime) throw unsafePropError;
            
            const item = validateDate(dateTime);
            if(sanitizedCalendar[dateKey][dateTimeKey] === undefined || sanitizedCalendar[dateKey][dateTimeKey] === null) {
                Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                    value: item,
                    configurable: true,
                    writable: true,
                    enumerable: true,
                })
                continue;
            } else if(sanitizedCalendar[dateKey][dateTimeKey]) {
                const currentTimeObj = sanitizedCalendar[dateKey][dateTimeKey];
                if(!Array.isArray(currentTimeObj) && typeof currentTimeObj === 'object') {
                    Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                        value: [item, currentTimeObj],
                        configurable: true,
                        writable: true,
                        enumerable: true,
                    });
                    continue;
                } else if(Array.isArray(currentTimeObj)) {
                    Object.defineProperty(sanitizedCalendar[dateKey], dateTimeKey, {
                        value: [item, ...currentTimeObj]
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