import { Dates } from "../types/util";
export type DatesOrFalse = Dates | false;
export declare const isLeapYear: (year?: string) => boolean;
export declare const getAllMonths: (year?: string) => {
    name: string;
    days: number;
}[];
export declare const separateDateAndParse: (date: string | Date, config: 'eu' | 'us') => DatesOrFalse;
export declare const days: string[];
