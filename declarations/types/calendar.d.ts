export interface CalendarObj {
    [dates: string]: {
        [times: string]: CalendarItem;
    };
}
export interface CalendarItem {
    id: string;
    dateStr: string;
    date: Date;
    data: string | number | {
        [props: string]: any;
    };
    duration?: {
        hours: number;
        minutes: number;
    };
    time?: {
        str: string;
        hour: number;
        minute: number;
    };
    startTime?: {
        str: string;
        hour: number;
        minute: number;
    };
    endTime?: {
        str: string;
        hour: number;
        minute: number;
    };
}
