import { CalendarObj } from "../../types/calendar";
export declare const sanitizeCalendar: (calendar: {
    [props: string]: any;
    [props: number]: any;
    [props: symbol]: any;
}) => CalendarObj;
