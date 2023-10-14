import { CalendarObj, CalendarItem, ItemTimes, GetDate } from '../types/calendar';
export declare class Calendar {
    private config;
    private calendarItems;
    private calendar;
    constructor(configuration?: 'eu' | 'us');
    getItemById(id: CalendarItem['id']): false | CalendarItem;
    getItemsByDate(date?: string | Date): ItemTimes | false;
    getDate(date?: string | Date): GetDate | false;
    static getDate(): void;
    getDates(startDate: string, endDate: string): false | undefined;
    setItem(date: Date | string, data: CalendarItem['data'], options?: {
        time?: string;
        startTime?: string;
        endTime?: string;
        id?: string | number;
    }): CalendarItem | false;
    removeItem(id: CalendarItem['id']): boolean;
    getYears(years: string | number): void;
    register(existingCalendar: object): boolean;
    get get(): {
        scheduler: string;
        config: "eu" | "us";
        items: CalendarObj;
        arrayItems: CalendarItem[];
    };
}
