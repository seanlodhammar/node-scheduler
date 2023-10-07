import { Calendar } from "../index";

const calendar = new Calendar('eu');

const setItem = calendar.setItem('12/12/2023', { name: 'Put up Christmas Tree', description: 'Need to put up christmas tree in living room' });
const getCurrentDate = calendar.getDate();
const getOtherDate = calendar.getDate('12/12/2023');
console.log(setItem);