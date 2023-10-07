"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var calendar = new index_1.Calendar('eu');
var setItem = calendar.setItem('12/12/2023', { name: 'Put up Christmas Tree', description: 'Need to put up christmas tree in living room' });
var getCurrentDate = calendar.getDate();
var getOtherDate = calendar.getDate('12/12/2023');
console.log(setItem);
