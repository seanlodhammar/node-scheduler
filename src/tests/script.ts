import { Calendar } from "../index";

const calendar1 = new Calendar('eu');

calendar1.setItem('25/12/23', 'Christmas', { time: '12:30' });
calendar1.setItem('25/12/23', 'Something else', { time: '12:30' })
const calendarObj = calendar1.get;

const calendar2 = new Calendar('eu');
// calendarObj['items']['25/12/2023']['12:30']['time']['hour'] = calendarObj['items']['25/12/2023']['12:30']['time']['hour'].toString()!;

calendar2.register(calendarObj);
