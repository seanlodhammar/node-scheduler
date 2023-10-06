import { Calendar } from "../index";

const calendar = new Calendar('us');
const calendarGetDateTest = calendar.getDate('21/1/2024');
console.log(calendarGetDateTest)