"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
var uuid_1 = require("uuid");
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var Calendar = /** @class */ (function () {
    function Calendar(configuration, existingCalendar) {
        this.calendar = {};
        this.config = 'eu';
        if (existingCalendar) {
            this.calendar = existingCalendar;
        }
        ;
        if (configuration) {
            if (configuration !== 'us' && configuration !== 'eu') {
                return;
            }
            this.config = configuration;
        }
    }
    Calendar.prototype.getItem = function (id) {
    };
    ;
    // "date" in form of "10/10/2023" or "10/10/23"
    Calendar.prototype.getDate = function (date) {
        try {
            var split = date.split('/');
            var dateArr_1 = [];
            split.forEach(function (element, _) {
                var elInt = parseInt(element);
                if (!elInt || isNaN(elInt)) {
                    return false;
                }
                dateArr_1.push(elInt);
            });
            if (dateArr_1.length < 3 || dateArr_1.length > 3) {
                return false;
            }
            if (dateArr_1.length === 3) {
                var day = dateArr_1[0];
                var month = dateArr_1[1];
                var year = dateArr_1[2];
                if (year.toString().length <= 1 || year.toString().length > 4) {
                    return false;
                }
                var dayStr = day.toString();
                var monthStr = month.toString();
                if (day.toString().length === 1) {
                    dayStr = "0".concat(day);
                }
                ;
                if (month.toString().length === 1) {
                    monthStr = "0".concat(month);
                }
                var param = '';
                if (this.config === 'eu') {
                    param = "".concat(year.toString().length === 4 ? year : '').concat(year.toString().length === 2 ? "20".concat(year) : '', "-").concat(monthStr, "-").concat(dayStr, "T00:00:00");
                }
                else if (this.config === 'us') {
                    param = "".concat(year.toString().length === 4 ? year : '').concat(year.toString().length === 2 ? "20".concat(year) : '', "-").concat(dayStr, "-").concat(monthStr);
                }
                else {
                    return false;
                }
                var data = new Date(param);
                var isValid = Date.parse(param);
                if (isNaN(isValid)) {
                    return false;
                }
                var dayDate = data.getDate();
                var dayName = days[data.getDay()];
                var monthDate = data.getMonth();
                var monthName = months[monthDate];
                var yearDate = data.getFullYear();
                var localeDateStr = data.toLocaleDateString();
                return { month: { name: monthName, date: monthDate + 1 }, day: { name: dayName, date: dayDate }, year: yearDate, date: data, dateStr: localeDateStr };
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    };
    // "date" in form of (0)5/10/2023 or 10/(0)5/2023 depending on config
    // "dates" in form of (0)5/10/2023-10/10/2023 or 10/(0)5/2023-10/10/2023 depending on config
    Calendar.prototype.getDates = function (dates) {
        var split = dates.split('/');
        if (split.length < 3) {
            return;
        }
        if (this.config === 'eu' || this.config !== 'us') {
            return;
        }
        else {
            return;
        }
        ;
    };
    Calendar.prototype.setItem = function (date) {
        var id = (0, uuid_1.v4)();
    };
    ;
    Calendar.prototype.getYears = function (years) {
        var _a;
        // single, e.g. 2021, 2022, 2023, etc.
        if (typeof years === 'number') {
            return;
        }
        // multiple, e.g. 2022-2023
        if (typeof years === 'string') {
            var int = (_a = parseInt(years)) !== null && _a !== void 0 ? _a : null;
            if (int) {
                return;
            }
            var split = years.split('-');
            if (split[1] !== '-') {
                return;
            }
        }
    };
    Object.defineProperty(Calendar.prototype, "get", {
        get: function () {
            return this.calendar;
        },
        enumerable: false,
        configurable: true
    });
    return Calendar;
}());
exports.Calendar = Calendar;
