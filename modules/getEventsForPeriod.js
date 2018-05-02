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

// console.log('getEvents.perDay(3)', getEvents.perDay(3));
// console.log('getEvents.perMonth(5)', getEvents.perMonth(5));
// console.log('getEvents.perWeek(1)', getEvents.perWeek(1));
// console.log('getEvents.perPeriod', getEvents.perPeriod('02.05.2018', '03.05.2018'));
