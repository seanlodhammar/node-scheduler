import { CalendarItem } from "../types/calendar";
interface Obj {
    [props: string | symbol | number]: any;
}
export declare const validateDate: (item: Obj | Obj[]) => CalendarItem | CalendarItem[];
export {};
