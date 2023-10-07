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

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];