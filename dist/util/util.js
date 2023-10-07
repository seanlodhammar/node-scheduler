"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.days = exports.separateDateAndParse = exports.getAllMonths = exports.isLeapYear = void 0;
var isLeapYear = function (year) {
    var yearStr = year || '';
    var digits = parseInt(new Date(yearStr).getFullYear().toString().slice(2));
    if (digits % 4 === 0) {
        return true;
    }
    return false;
};
exports.isLeapYear = isLeapYear;
var getAllMonths = function (year) {
    var yearStr = '';
    if (year) {
        yearStr = "".concat(year.toString().length === 4 ? year : '').concat(year.toString().length === 2 ? "20".concat(year) : '');
    }
    var months = [{ name: 'January', days: 31 }, { name: 'February', days: (0, exports.isLeapYear)(yearStr) ? 29 : 28 }, { name: 'March', days: 31 }, { name: 'April', days: 30 }, { name: 'May', days: 31 }, { name: 'June', days: 30 }, { name: 'July', days: 31 }, { name: 'August', days: 31 }, { name: 'September', days: 30 }, { name: 'October', days: 31 }, { name: 'November', days: 30 }, { name: 'December', days: 31 }];
    return months;
};
exports.getAllMonths = getAllMonths;
var separateDateAndParse = function (date, config) {
    var split = date.split('/');
    var dateArr = [];
    split.forEach(function (element, _) {
        var elInt = parseInt(element);
        if (!elInt || isNaN(elInt)) {
            return false;
        }
        dateArr.push({ int: elInt, str: element });
    });
    if (dateArr.length < 3 || dateArr.length > 3) {
        return false;
    }
    var months = (0, exports.getAllMonths)();
    var day;
    var month;
    var year;
    if (config === 'eu' || config === 'irrelevant') {
        day = dateArr[0].int;
        month = dateArr[1].int;
        year = dateArr[2].int;
    }
    if (config === 'us') {
        month = dateArr[0].int;
        day = dateArr[1].int;
        year = dateArr[2].int;
    }
    if (!month || !day || !year) {
        return false;
    }
    var monthObj = months[month - 1];
    if (!monthObj || month > 12 || month < 1)
        return false;
    if (monthObj.days < day || day < 1)
        return false;
    var dayStr = day.toString();
    var monthStr = month.toString();
    if (dayStr.length === 1) {
        dayStr = "0".concat(day);
    }
    if (monthStr.length === 1) {
        monthStr = "0".concat(month);
    }
    ;
    var yearStr = dateArr[2].str;
    if (yearStr.length === 2) {
        var strPrefix = new Date().getFullYear().toString().slice(0, 2);
        yearStr = "".concat(strPrefix).concat(yearStr);
    }
    if (yearStr.length !== 4) {
        return false;
    }
    var dateString = "".concat(day, "/").concat(month, "/").concat(yearStr);
    return { day: { str: dayStr, int: day }, month: { str: monthStr, int: month }, year: { str: yearStr, int: parseInt(yearStr) }, dateString: dateString };
};
exports.separateDateAndParse = separateDateAndParse;
exports.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
