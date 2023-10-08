import { Calendar } from "../index";

const calendar = new Calendar('eu');

const setItemTime = calendar.setItem('18/13', 'Something I need to do', { time: '01:08' })
calendar.setItem('13/12/2023', 'Something else I need to do')
const getCurrentDate = calendar.getDate();

const getItem1Date = calendar.getDate('12/12/2023');
const getOtherDate = calendar.getDate('13/12/2023');

// console.log(setItemTime);

console.log(getCurrentDate);