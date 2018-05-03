import calendarEvents from './calendarEvents';
import helperModule from './helper';

const getEvents = (function () {
    return {
        perDay(dayNumber) {
            return calendarEvents.getEvents
                .filter(event => event.newDate.getDay() === dayNumber);
        },

        perWeek(weekNumber) {
            return calendarEvents.getEvents
                .filter(event => parseInt(event.newDate.getDate() / 7) === (weekNumber - 1));
        },

        perMonth(monthNumber) {
            return calendarEvents.getEvents
                .filter(event => event.newDate.getMonth() === (monthNumber - 1));
        },

        perPeriod(startPeriod, finishPeriod) {
            startPeriod = helperModule.newDate(startPeriod).getTime();
            finishPeriod = helperModule.newDate(finishPeriod).getTime();
            return calendarEvents.getEvents
                .filter (event => event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod);
        }
    };
}());

export default getEvents;
