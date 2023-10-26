import { StructureItem as ScheduleItem } from "./general";

export interface ScheduleObj {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

export interface ScheduleDay {
    [times: string]: ScheduleItem | ScheduleItem[];
}

