import { StructureItem as CalendarItem } from "./general";

export interface ItemTimes {
    [times: string]: CalendarItem | CalendarItem[];
}

export interface CalendarObj {
    [dates: string]: ItemTimes;
}

export const CalendarItemKeys = ['id', 'dateStr', 'date', 'data', 'type', 'time', 'duration', 'startTime', 'endTime'];

export interface GetDateUtil {
    month: {
        name: string;
        date: number
    };
    day: {
        name: string;
        date: number;
    };
    year: number;
    date: Date;
    dateStr: string;
    leap: boolean;
}

export interface GetDate extends GetDateUtil {
    items: {
        [times: string]: CalendarItem | CalendarItem[];
    };
}

