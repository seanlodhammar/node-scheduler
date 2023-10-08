export interface GetDate {
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
export declare const getDate: (date: string | Date, config: 'eu' | 'us') => GetDate | false;
