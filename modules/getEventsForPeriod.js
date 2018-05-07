import calendarEvents from './calendarEvents';
import helperModule from './helper';


export default (function () {
    return {
        perDay(dayNumber) {
            return calendarEvents.getEvents.filter(event => event.newDate.getDay() === dayNumber);
        },

        perWeek(weekNumber) {
            return calendarEvents.getEvents.filter(event => {
                const year = event.newDate.getFullYear();
                const month = event.newDate.getMonth();
                const firstWeekDayOfMonth = new Date(year, month).getDay() || 7;
                const numberOfDayOfMonth = event.newDate.getDate();

                return ((8 - firstWeekDayOfMonth) + (7 * (weekNumber - 1)) >= numberOfDayOfMonth) && (numberOfDayOfMonth > (8 - firstWeekDayOfMonth) + (7 * (weekNumber - 2)));
            });
        },

        perMonth(monthNumber) {
            return calendarEvents.getEvents.filter(event => event.newDate.getMonth() === (monthNumber - 1));
        },

        perPeriod(startPeriod, finishPeriod) {
            startPeriod = helperModule.newDate(startPeriod).getTime();
            finishPeriod = helperModule.newDate(finishPeriod).getTime();
            return calendarEvents.getEvents.filter (event => event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod);
        }
    };
}());
