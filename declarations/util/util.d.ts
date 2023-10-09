import { CalendarObj } from "../types/calendar";
interface Dates {
    day: {
        str: string;
        int: number;
    };
    month: {
        str: string;
        int: number;
    };
    year: {
        str: string;
        int: number;
    };
    dateString: string;
}
export type DatesOrFalse = Dates | false;
export declare const isLeapYear: (year?: string) => boolean;
export declare const getAllMonths: (year?: string) => {
    name: string;
    days: number;
}[];
export declare const separateDateAndParse: (date: string | Date, config: 'eu' | 'us') => DatesOrFalse;
export declare const days: string[];
export declare const sanitizeCalendar: (calendar: {
    [props: string]: any;
    [props: number]: any;
    [props: symbol]: any;
}) => CalendarObj | false;
export {};
