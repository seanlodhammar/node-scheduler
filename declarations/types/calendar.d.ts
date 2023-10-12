export interface ItemTimes {
    [times: string]: CalendarItem | CalendarItem[];
}
export interface CalendarObj {
    [dates: string]: ItemTimes;
}
export interface CalendarItemTimeProps {
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
    duration?: {
        hours: number;
        minutes: number;
    };
}
export interface CalendarItem extends CalendarItemTimeProps {
    id: string | number;
    dateStr: string;
    date: Date;
    data: string | number | {
        [props: string]: any;
    };
    type: 'time' | 'default';
}
export interface GetDateUtil {
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
    leap: boolean;
}
export interface GetDate extends GetDateUtil {
    items: {
        [times: string]: CalendarItem | CalendarItem[];
    };
}
