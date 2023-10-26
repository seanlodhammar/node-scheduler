export interface StructureItemTimeProps {
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
    duration?: {
        hours: number;
        minutes: number;
    },
}

export interface StructureItem extends StructureItemTimeProps {
    id: string | number;
    dateStr: string;
    date: Date;
    data: string | number | {
        [props: string]: any;
    };
    type: 'time' | 'default';
}