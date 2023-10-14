import { Calendar } from "../index";

const calendar1 = new Calendar('eu');

calendar1.setItem('25/12/23', 'Christmas', { time: '12:30' });
// calendar1.setItem('25/12/23', 'Something else', { time: '12:30' })
const calendarObj = calendar1.get as { [props: string]: any };

const calendar2 = new Calendar('eu');
