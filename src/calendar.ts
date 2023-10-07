import { v4 as uuid } from 'uuid';
import { getDate } from './util/date';
import { getAllMonths } from './util/util';

interface CalendarItem {
    id: string;
    dateStr: string;
    date: Date;
    data: {
        [props: string]: any;
    };
}



interface ICalendar {
    [years: string]: {
        [months: string]: {
            [days: string]: CalendarItem[]
        }
    }
}



export class Calendar {
    private calendar : ICalendar = {};
    private config : 'eu' | 'us' = 'eu';
    
    constructor(configuration?: 'eu' | 'us', existingCalendar?: ICalendar) {
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
    public getDate(date: string) {
        try {
            const data = getDate(date, this.config);
            if(!data) return false;
            return data; // add additional data such as custom calendar class data
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
        const dates = [];
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
        
        console.log(dates);

    }


    public setItem(date: Date | string, data?: CalendarItem['data']) {
        const id = uuid();

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