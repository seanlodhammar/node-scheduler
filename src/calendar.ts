import { v4 as uuid } from 'uuid';
import { getDate as getDateUtil } from './util/date';
import { getAllMonths } from './util/util';
import { CalendarObj, CalendarItem, ItemTimes, GetDate } from './types/calendar';

// Replace all false returns with errors for better typing

export class Calendar {
    private calendar : CalendarObj = {};
    private calendarItems : CalendarItem[] = [];
    private config : 'eu' | 'us' = 'eu';
    
    constructor(configuration?: 'eu' | 'us', existingCalendar?: CalendarObj) {
        if(existingCalendar) {
            this.calendar = existingCalendar;
        };
        if(configuration) {
            if(configuration !== 'us' && configuration !== 'eu') {
                return;
            }
            this.config = configuration;
        }
    }

    public getItemById(id: string) {
        
    };

    public getItemsByDate(date: string | Date = new Date()): ItemTimes | false {
        const data = this.getDate(date);
        if(!data || !data.items) {
            return false;
        }
        return data.items;
    }

    // "date" in form of "10/10/2023" or "10/10/23"
    public getDate(date: string | Date = new Date()): GetDate | false {
        try {
            const data = getDateUtil(date, this.config);
            if(!data) return false;
            return { items: this.calendar[data.dateStr] || null, ...data };
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // "date" in form of (0)5/10/2023 or 10/(0)5/2023 depending on config
    // "dates" in form of (0)5/10/2023-10/10/2023 or 10/(0)5/2023-10/10/2023 depending on config
    public getDates(startDate: string, endDate: string) {
        const startDateSplit = startDate.split('/');
        const endDateSplit = endDate.split('/');

        const startDay = parseInt(startDateSplit[0]);
        const endDay = parseInt(endDateSplit[0]);
        const startMonth = parseInt(startDateSplit[1]);
        const endMonth = parseInt(endDateSplit[1]);
        const startYear = parseInt(startDateSplit[2]);
        const endYear = parseInt(endDateSplit[2]);
        
        if(isNaN(startDay) || isNaN(endDay) || isNaN(startMonth) || isNaN(endMonth)) {
            return false;
        }

        if(startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
            return false;
        }

        const months = getAllMonths(startDate);
        let monthIteration = startMonth - 1;
        const startMonthObj = months[monthIteration];
        const dates: any[] = [];
        const difference = endDay - startDay;
        for(let i = startDay; i <= difference; i++) {
            if(i < 1) {
                console.log('no')
                continue;
            }
            if(i > startMonthObj.days) {
                if(startMonth !== endMonth) {
                    const monthDiff = endMonth - startMonth;
                    if(monthDiff > 1) {
                        console.log('something');
                    }
                }
                dates.push(false);
                continue;
            }
            const date = this.getDate(`${i}/${startMonth}/${startYear}`);
            dates.push(date);
        };

    }

    // Make options.startTime && options.endTime work
    public setItem(date: Date | string, data: CalendarItem['data'], options?: { time?: string; startTime?: string; endTime?: string; id?: string | number }): CalendarItem | false {
        const dateData = this.getDate(date);
        if(!dateData) return false;
        const { dateStr, date: dateInstance } = dateData;

        if(options && options.time) {
 
            // Time in 24 hour form e.g. 8:00 for 8am and 17:00 for 5pm
            const { time } = options;
            const split = time.split(':');
            const hour = split[0];
            const hourInt = parseInt(hour);
            const minute = split[1];
            const minuteInt = parseInt(minute);

            if(isNaN(hourInt) || isNaN(minuteInt)) return false;
            if(hourInt < 0 || hourInt > 23 || minuteInt < 0 || minuteInt > 59) return false;
            if(hour.length > 2 || minute.length > 2 || time.length < 3) return false;
        
            let id;

            if(options.id) {
                id = options.id;
            } else {
                id = uuid();
            }

            let hourStr = hour;
            let minuteStr = minute;

            if(hourStr.length === 1) {
                hourStr = `0${hour}`;
            }

            if(minuteStr.length === 1) {
                minuteStr = `0${minute}`;
            }

            const timeStr = `${hourStr}:${minuteStr}`;

            const itemObj : CalendarItem = {
                id: id,
                dateStr: dateStr,
                date: dateInstance,
                type: 'time',
                data: data,
                duration: {
                    hours: 0,
                    minutes: 30,
                },
                time: {
                    str: timeStr,
                    hour: hourInt,
                    minute: minuteInt,
                }
            };

            if(!this.calendar[dateStr]) {
                Object.defineProperty(this.calendar, dateStr, {
                    value: {},
                    configurable: true,
                    enumerable: true,
                    writable: true
                });
            };

            const timeObj = this.calendar[dateStr][timeStr];
            if(timeObj) {
                if(Array.isArray(timeObj)) {
                    this.calendar[dateStr]['default'] = [itemObj, ...timeObj];
                } else if(typeof timeObj === 'object') {
                    this.calendar[dateStr]['default'] = [itemObj, timeObj];
                }
                this.calendarItems.push(itemObj);
                return itemObj;
            }

            Object.defineProperty(this.calendar[dateStr], timeStr, {
                value: itemObj,
                configurable: true,
                enumerable: true,
                writable: true,
            });

            this.calendarItems.push(itemObj);
            
            return itemObj;
        }

        let id;

        if(options && options.id) {
            id = options.id;
        } else {
            id = uuid();   
        }

        const itemObj: CalendarItem = {
            id: id,
            dateStr: dateStr,
            date: dateInstance,
            data: data,
            type: 'default',
        }

        if(!this.calendar[dateStr]) {
            Object.defineProperty(this.calendar, dateStr, {
                value: {},
                configurable: true,
                enumerable: true,
                writable: true
            });;
        }

        const defaultObj = this.calendar[dateStr]['default'];
        if(defaultObj) {
            if(Array.isArray(defaultObj)) {
                this.calendar[dateStr]['default'] = [itemObj, ...defaultObj];
            } else if(typeof defaultObj === 'object') {
                this.calendar[dateStr]['default'] = [itemObj, defaultObj];
            }
            this.calendarItems.push(itemObj);
            return itemObj;
        }

        Object.defineProperty(this.calendar[dateStr], 'default', {
            value: itemObj,
            configurable: true,
            enumerable: true,
            writable: true,
        });

        this.calendarItems.push(itemObj);

        return itemObj;
    };

    public removeItem(id: string | number) : boolean 
    {
        console.log(this.calendar);
        const find = this.calendarItems.findIndex(item => item.id.toString() === id.toString());
        if(find === -1 || find === null || find == undefined) {
            return false;
        }

        const arrItem = this.calendarItems[find];
        const calendar = this.calendar;
        const dateObj = calendar[arrItem.dateStr];
        
        let typeKey;

        if(arrItem.type === 'default') {
            typeKey = 'default';
        } else if(arrItem.type === 'time' && arrItem.time) {
            typeKey = arrItem.time.str;
        } else {
            return false;
        };

        const objItem = dateObj[typeKey];

        if(Array.isArray(objItem)) {
            const itemIndex = objItem.findIndex(item => item.id.toString() === id);
            if(itemIndex === undefined || itemIndex === null || itemIndex === -1) {
                return false;
            }
            objItem.splice(itemIndex, 1);
            if(objItem.length === 1) {
                dateObj[typeKey] = objItem[0]; // converts back to single obj
            };
            
        } else if(!(Array.isArray(objItem)) && typeof objItem === 'object') {
            delete dateObj[typeKey];
            delete calendar[arrItem.dateStr];
        } else {
            return false;
        }

        console.log(this.calendar);

        this.calendarItems.splice(find, 1);
        
        return true;
    }

    public getYears(years: string | number) {
        // single, e.g. 2021, 2022, 2023, etc.
        if(typeof years === 'number') {
            return;
        }
        // multiple, e.g. 2022-2023
        if(typeof years === 'string') {
            const int = parseInt(years) ?? null;
            if(int) {
                return;
            }
            const split = years.split('-');
            if(split[1] !== '-') {
                return;
            }

        }
    }

    get get() {
        return this.calendar;
    }
}