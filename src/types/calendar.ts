// export interface CalendarObj {
//     [years: string]: {
//         [months: string]: {
//             [days: string]: CalendarItem[]
//         }
//     }
// }

export interface ItemTimes {
    [times: string]: CalendarItem | CalendarItem[];
}

export interface CalendarObj {
    [dates: string]: ItemTimes;
}

export interface CalendarItem {
    id: string | number;
    dateStr: string;
    date: Date;
    data: string | number | {
        [props: string]: any;
    };
    duration?: {
        hours: number;
        minutes: number;
    },
    type: 'time' | 'default';
    time?: {
        str: string;
        hour: number;
        minute: number;
    }
    startTime?: {
        str: string;
        hour: number;
        minute: number
    }
    endTime?: {
        str: string;
        hour: number;
        minute: number;
    }
}

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

