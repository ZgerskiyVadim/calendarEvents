import throwError from '../throwError';
import { daysInWeek, sunday } from '../constants';
import calendarEvents from './calendarEvents';
import helperModule from './helper';


export default (function () {

    return {
        perDay(dayNumber) {
            if (!helperModule.isNumber(dayNumber)) return throwError('Please enter number of day when 1 - monday and 7 - sunday');
            return calendarEvents.getEvents.filter(event => (event.newDate.getDay() || sunday) === dayNumber);
        },

        perWeek(weekNumber) {
            if (!helperModule.isNumber(weekNumber)) return throwError('Please enter number of week when 1 - first week');
            return calendarEvents.getEvents.filter(event => {
                const year = event.newDate.getFullYear();
                const month = event.newDate.getMonth();
                const firstWeekDayOfMonth = new Date(year, month).getDay() || sunday;
                const numberOfDayOfMonth = event.newDate.getDate();

                return ((8 - firstWeekDayOfMonth) + (daysInWeek * (weekNumber - 1)) >= numberOfDayOfMonth) && (numberOfDayOfMonth > (8 - firstWeekDayOfMonth) + (daysInWeek * (weekNumber - 2)));
            });
        },

        perMonth(monthNumber) {
            if (!helperModule.isNumber(monthNumber)) return throwError('Please enter number of month when 1 - january and 12 - december');
            return calendarEvents.getEvents.filter(event => event.newDate.getMonth() === (monthNumber - 1));
        },

        perPeriod(startPeriod, finishPeriod) {
            startPeriod = helperModule.newDate(startPeriod) && helperModule.newDate(startPeriod).getTime();
            finishPeriod = helperModule.newDate(finishPeriod) && helperModule.newDate(finishPeriod).getTime();
            if (!startPeriod || !finishPeriod) return throwError('Please enter valid date');
            return calendarEvents.getEvents.filter (event => event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod);
        }
    };
}());
