"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
var uuid_1 = require("uuid");
var date_1 = require("./util/date");
var util_1 = require("./util/util");
var Calendar = (function () {
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
    Calendar.prototype.getDate = function (date) {
        try {
            var data = (0, date_1.getDate)(date || new Date(), this.config);
            if (!data)
                return false;
            return __assign({ items: this.calendar[data.dateStr] || null }, data);
        }
        catch (err) {
            console.log(err);
            return false;
        }
    };
    Calendar.prototype.getDates = function (startDate, endDate) {
        var startDateSplit = startDate.split('/');
        var endDateSplit = endDate.split('/');
        var startDay = parseInt(startDateSplit[0]);
        var endDay = parseInt(endDateSplit[0]);
        var startMonth = parseInt(startDateSplit[1]);
        var endMonth = parseInt(endDateSplit[1]);
        var startYear = parseInt(startDateSplit[2]);
        var endYear = parseInt(endDateSplit[2]);
        if (isNaN(startDay) || isNaN(endDay) || isNaN(startMonth) || isNaN(endMonth)) {
            return false;
        }
        if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
            return false;
        }
        var months = (0, util_1.getAllMonths)(startDate);
        var monthIteration = startMonth - 1;
        var startMonthObj = months[monthIteration];
        var dates = [];
        var difference = endDay - startDay;
        for (var i = startDay; i <= difference; i++) {
            if (i < 1) {
                console.log('no');
                continue;
            }
            if (i > startMonthObj.days) {
                if (startMonth !== endMonth) {
                    var monthDiff = endMonth - startMonth;
                    if (monthDiff > 1) {
                    }
                }
                dates.push(false);
                continue;
            }
            var date = this.getDate("".concat(i, "/").concat(startMonth, "/").concat(startYear));
            dates.push(date);
        }
        ;
    };
    Calendar.prototype.setItem = function (date, data, options) {
        var dateData = this.getDate(date);
        if (!dateData)
            return false;
        var dateStr = dateData.dateStr, dateInstance = dateData.date;
        if (options && options.time) {
            var time = options.time;
            var split = time.split(':');
            var hour = split[0];
            var hourInt = parseInt(hour);
            var minute = split[1];
            var minuteInt = parseInt(minute);
            if (isNaN(hourInt) || isNaN(minuteInt))
                return false;
            if (hourInt < 0 || hourInt > 23 || minuteInt < 0 || minuteInt > 59)
                return false;
            var id_1 = (0, uuid_1.v4)();
            var timeStr = "".concat(hourInt, ":").concat(minuteInt);
            var itemObj_1 = {
                id: id_1,
                dateStr: dateStr,
                date: dateInstance,
                data: data,
                duration: {
                    hours: 0,
                    minutes: 30,
                },
                time: {
                    str: timeStr,
                    hour: hourInt,
                    minute: minuteInt,
                }
            };
            this.calendar[dateStr][timeStr] = itemObj_1;
            return itemObj_1;
        }
        var id = (0, uuid_1.v4)();
        var itemObj = {
            id: id,
            dateStr: dateStr,
            date: dateInstance,
            data: data
        };
        this.calendar[dateStr] = __assign({ default: itemObj }, this.calendar);
        return itemObj;
    };
    ;
    Calendar.prototype.getYears = function (years) {
        var _a;
        if (typeof years === 'number') {
            return;
        }
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
