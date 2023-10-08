import { Calendar } from "../index";

const calendar = new Calendar('eu');

const setItemTime = calendar.setItem('18/12', 'Something I need to do');
const setItemTimeAgain = calendar.setItem('18/12', 'Something else I need to do');
calendar.setItem('13/12/2023', 'Tidy bedroom', { id: '123', time: '14:20' })
const getCurrentDate = calendar.getDate();

const getItem1Date = calendar.getDate('12/12/2023');
const getOtherDate = calendar.getDate('13/12/2023');

// console.log(getOtherDate);
// console.log(getOtherDate);