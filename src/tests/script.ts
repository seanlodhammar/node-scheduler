import { Calendar } from "../index";

const calendar1 = new Calendar('eu');

calendar1.setItem('25/12/23', 'Christmas', { time: '12:30' });
const calendarObj = calendar1.get;

const calendar2 = new Calendar('eu');
calendar2.register(calendarObj);