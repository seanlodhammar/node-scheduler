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
        [months: string]: CalendarItem[];
    };
}
export declare class Calendar {
    private calendar;
    private config;
    constructor(configuration?: 'eu' | 'us', existingCalendar?: ICalendar);
    getItem(id: string): void;
    getDate(date: string): false | {
        month: {
            name: string;
            date: number;
        };
        day: {
            name: string;
            date: number;
        };
        year: number;
        date: Date;
        dateStr: string;
    } | undefined;
    getDates(dates: string): void;
    setItem(date: Date | string): void;
    getYears(years: string | number): void;
    get get(): ICalendar;
}
export {};
