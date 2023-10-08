interface Dates {
    day: {
        str: string;
        int: number;
    }
    month: {
        str: string;
        int: number;
    }
    year: {
        str: string;
        int: number;
    };
    dateString: string;
}

export type DatesOrFalse = Dates | false;

export const isLeapYear = (year?: string): boolean =>  {
    const yearStr = year || '';
    const digits = parseInt(new Date(yearStr).getFullYear().toString().slice(2));
    if(digits % 4 === 0) {
        return true;
    }
    return false;
}

export const getAllMonths = (year?: string) => {
    let yearStr = ''
    if(year) {
        yearStr = `${year.toString().length === 4 ? year : ''}${year.toString().length === 2 ? `20${year}`: ''}`;
    }
    const months = [{ name: 'January', days: 31 }, { name: 'February', days: isLeapYear(yearStr) ? 29 : 28 }, { name: 'March', days: 31 }, { name:'April', days: 30 }, { name:'May', days: 31 }, { name:'June', days: 30 }, { name: 'July', days: 31 }, { name: 'August', days: 31 }, { name: 'September', days: 30 }, { name:'October', days: 31 }, { name: 'November', days: 30 }, { name: 'December', days: 31 }];
    return months;
}

// date in form of 10/12/23 or 10/12/2023
export const separateDateAndParse = (date: string, config?: 'eu' | 'us' | 'irrelevant'): DatesOrFalse => {
    const split = date.split('/');
    const dateArr : { int: number; str: string; }[] = [];
    split.forEach((element, _) => {
        const elInt = parseInt(element);
        if(!elInt || isNaN(elInt)) {
            return false;
        }
        dateArr.push({ int: elInt, str: element });
    });

    const yearDate = new Date();

    const months = getAllMonths();
    let day;
    let month;
    let year;
    
    if(config === 'eu' || config === 'irrelevant') {
        day = dateArr[0].int;
        month = dateArr[1].int;
    }
    if(config === 'us') {
        month = dateArr[0].int;
        day = dateArr[1].int;
    }

    if(!dateArr[2] || !dateArr[2].int || !dateArr[2].str) {
        year = yearDate.getFullYear();
        dateArr.push({ int: year, str: year.toString() })
    } else {
        year = dateArr[2].int;
    }

    if(!month || !day || !year) {
        return false;
    }

    if(dateArr.length < 3 || dateArr.length > 3) return false;

    const monthObj = months[month - 1];
    if(!monthObj || month > 12 || month < 1) return false;
    if(monthObj.days < day || day < 1) return false;

    let dayStr = day.toString();
    let monthStr = month.toString();

    if(dayStr.length === 1) {
        dayStr = `0${day}`;
    }

    if(monthStr.length === 1) {
        monthStr = `0${month}`;
    };

    let yearStr = dateArr[2].str;

    if(yearStr.length === 2) {
        const strPrefix = yearDate.getFullYear().toString().slice(0, 2);
        yearStr = `${strPrefix}${yearStr}`;
    }

    if(yearStr.length !== 4) {
        return false;
    }

    const dateString = `${day}/${month}/${yearStr}`;

    return { day: { str: dayStr, int: day }, month: { str: monthStr, int: month }, year: { str: yearStr, int: parseInt(yearStr) }, dateString: dateString };
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];