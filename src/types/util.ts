export interface Dates {
    day: {
        str: string;
        int: number;
    }

    month: {
        str: string;
        int: number;
    };
    year: {
        str: string;
        int: number;
    }

    dateString: string;
}

export interface DateFormat {
    day: number;
    month: number;
    year: number;
}

export type DatesOrFalse = Dates | false;