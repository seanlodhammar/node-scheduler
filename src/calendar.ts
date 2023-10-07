import { v4 as uuid } from 'uuid';
import { GetDate, getDate as getDateUtil } from './util/date';
import { getAllMonths, separateDateAndParse } from './util/util';
import { CalendarObj, CalendarItem } from './types/calendar';
import { DatesOrFalse } from './util/util';

export class Calendar {
    private calendar : CalendarObj = {};
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

    public getItem(id: string) {
        
    };

    // "date" in form of "10/10/2023" or "10/10/23"
    public getDate(date?: string | Date): GetDate | false {
        try {
            const data = getDateUtil(date || new Date(), this.config);
            if(!data) return false;
            return { items: this.calendar[data.dateStr] || null, ...data }; // add additional data such as custom calendar item data
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
                        
                    }
                }
                dates.push(false);
                continue;
            }
            const date = this.getDate(`${i}/${startMonth}/${startYear}`);
            dates.push(date);
        };

    }


    public setItem(date: Date | string, data: CalendarItem['data'], options?: { time?: string; startTime?: string; endTime?: string; }) {
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
        
            const id = uuid();
            const timeStr = `${hourInt}:${minuteInt}`

            const itemObj : CalendarItem = {
                id: id,
                dateStr: dateStr,
                date: dateInstance,
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

            this.calendar[dateStr][timeStr] = itemObj;
            return itemObj;
        }

        const id = uuid();   
        const itemObj: CalendarItem = {
            id: id,
            dateStr: dateStr,
            date: dateInstance,
            data: data
        }

        this.calendar[dateStr] = { default: itemObj, ...this.calendar };
        return itemObj;
    };

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