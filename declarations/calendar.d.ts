import { CalendarObj, CalendarItem, ItemTimes, GetDate } from './types/calendar';
export declare class Calendar {
    private calendar;
    private calendarItems;
    private config;
    constructor(configuration?: 'eu' | 'us', existingCalendar?: CalendarObj);
    getItemById(id: string): void;
    getItemsByDate(date?: string | Date): ItemTimes | false;
    getDate(date?: string | Date): GetDate | false;
    getDates(startDate: string, endDate: string): false | undefined;
    setItem(date: Date | string, data: CalendarItem['data'], options?: {
        time?: string;
        startTime?: string;
        endTime?: string;
        id?: string | number;
    }): CalendarItem | false;
    removeItem(id: string | number): boolean;
    getYears(years: string | number): void;
    get get(): CalendarObj;
}
