import { v4 as uuid } from 'uuid';

interface CalendarItem {
    id: string;
    dateStr: string;
    date: Date;
    data: {
        [props: string]: any;
    };
}

interface ICalendar {
    [years: string]: {
        [months: string]: CalendarItem[];
    }
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export class Calendar {
    private calendar : ICalendar = {};
    private config : 'eu' | 'us' = 'eu';
    
    constructor(configuration?: 'eu' | 'us', existingCalendar?: ICalendar) {
        if(existingCalendar) {
            this.calendar = existingCalendar;
        };
        if(configuration) {
            if(configuration !== 'us' && configuration !== 'eu') {
                return;
            }
            this.config = configuration;
        }
    }

    public getItem(id: string) {
        
    };

    // "date" in form of "10/10/2023" or "10/10/23"
    public getDate(date: string) {
        try {
            const split = date.split('/');
            const dateArr : number[] = [];
            split.forEach((element, _) => {
                const elInt = parseInt(element);
                if(!elInt || isNaN(elInt)) {
                    return false;
                }
                dateArr.push(elInt);
            })
            if(dateArr.length < 3 || dateArr.length > 3) {
                return false;
            }
            if(dateArr.length === 3) {
                
                const day = dateArr[0];
                const month = dateArr[1];
                const year = dateArr[2];
                
                if(year.toString().length <= 1 || year.toString().length > 4) {
                    return false;
                }
                let dayStr = day.toString();
                let monthStr = month.toString();
                if(day.toString().length === 1) {
                    dayStr = `0${day}`;
                };
                if(month.toString().length === 1) {
                    monthStr = `0${month}`;
                }
    
                let param = '';

                if(this.config === 'eu') {
                    param = `${year.toString().length === 4 ? year : ''}${year.toString().length === 2 ? `20${year}` : ''}-${monthStr}-${dayStr}T00:00:00`;
                } else if(this.config === 'us') {
                    param = `${year.toString().length === 4 ? year : ''}${year.toString().length === 2 ? `20${year}` : ''}-${dayStr}-${monthStr}`;
                } else {
                    return false;
                }

                const data = new Date(param);
                const isValid = Date.parse(param);
    
                if(isNaN(isValid)) {
                    return false;
                }
                                
                const dayDate = data.getDate();
                const dayName = days[data.getDay()];
                const monthDate = data.getMonth();
                const monthName = months[monthDate];
                const yearDate = data.getFullYear();
                const localeDateStr = data.toLocaleDateString();
                
                return { month: { name: monthName, date: monthDate + 1 }, day: { name: dayName, date: dayDate }, year: yearDate, date: data, dateStr: localeDateStr };
            }



        } catch (err) {
            console.log(err);
            return false;
        }


    }

    // "date" in form of (0)5/10/2023 or 10/(0)5/2023 depending on config
    // "dates" in form of (0)5/10/2023-10/10/2023 or 10/(0)5/2023-10/10/2023 depending on config
    public getDates(dates: string) {
 
        const split = dates.split('/');
        if(split.length < 3) {
            return;
        }
        if(this.config === 'eu' || this.config !== 'us') {
            
            return;
        } else {
            return;
        };
    }


    public setItem(date: Date | string) {
        const id = uuid();

    };

    public getYears(years: string | number) {
        // single, e.g. 2021, 2022, 2023, etc.
        if(typeof years === 'number') {
            return;
        }
        // multiple, e.g. 2022-2023
        if(typeof years === 'string') {
            const int = parseInt(years) ?? null;
            if(int) {
                return;
            }
            const split = years.split('-');
            if(split[1] !== '-') {
                return;
            }

        }
    }

    get get() {
        return this.calendar;
    }
}