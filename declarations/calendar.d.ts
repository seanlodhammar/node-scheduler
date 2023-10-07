import { GetDate } from './util/date';
import { CalendarObj, CalendarItem } from './types/calendar';
export declare class Calendar {
    private calendar;
    private config;
    constructor(configuration?: 'eu' | 'us', existingCalendar?: CalendarObj);
    getItem(id: string): void;
    getDate(date?: string | Date): GetDate | false;
    getDates(startDate: string, endDate: string): false | undefined;
    setItem(date: Date | string, data: CalendarItem['data'], options?: {
        time?: string;
        startTime?: string;
        endTime?: string;
    }): false | CalendarItem;
    getYears(years: string | number): void;
    get get(): CalendarObj;
}
