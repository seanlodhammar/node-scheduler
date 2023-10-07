export declare const getDate: (date: string, config: 'eu' | 'us') => false | {
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
} | undefined;
