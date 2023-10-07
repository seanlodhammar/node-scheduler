"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = void 0;
var util_1 = require("./util");
var getDate = function (date, config) {
    var dates = (0, util_1.separateDateAndParse)("".concat(date instanceof Date ? date.toLocaleString() : date), config);
    if (!dates)
        return false;
    var day = dates.day, month = dates.month, year = dates.year;
    var param = "".concat(year.str, "-").concat(month.str, "-").concat(day.str, "T00:00:00");
    ;
    var data = new Date(param);
    var isValid = Date.parse(param);
    if (isNaN(isValid)) {
        return false;
    }
    var months = (0, util_1.getAllMonths)(year.str);
    var dayDate = data.getDate();
    var dayName = util_1.days[data.getDay()];
    var monthDate = data.getMonth();
    var monthObj = months[monthDate];
    var monthName = monthObj.name;
    var yearDate = data.getFullYear();
    var yearDateStr = yearDate.toString();
    var localeDateStr = data.toLocaleDateString();
    if (month.int !== monthDate + 1) {
        return false;
    }
    return { month: { name: monthName, date: monthDate + 1 }, day: { name: dayName, date: dayDate }, year: yearDate, date: data, dateStr: localeDateStr, leap: (0, util_1.isLeapYear)(yearDateStr) };
};
exports.getDate = getDate;
