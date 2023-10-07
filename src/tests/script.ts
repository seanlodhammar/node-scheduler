import { Calendar } from "../index";

const calendar = new Calendar('eu');
const calendarGetDateTest = calendar.getDate('29/2/23');
const calendarGetDatesTest = calendar.getDates('21/12/23', '22/12/23');
