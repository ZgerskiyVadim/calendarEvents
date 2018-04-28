import calendarEvents from '../main';
import helperModule from './helper';

export default (function () {
    const secondsInDay = 86400 * 1000;
    return {
        everyDay(nameOfEvent, date, time, event) {
            setInterval(() => {
                calendarEvents.createEvent(nameOfEvent, date, time, event);
            }, secondsInDay);
        },
        everySelectedDay(nameOfEvent, date, time, event, ...selectedDays) {
            const currentDayOfWeek = new Date().getDay();
            const parsedDate = helperModule.parseData(date, time);
            console.log(parsedDate.day);
            console.log('includes', selectedDays.includes(currentDayOfWeek));
        }
    };
}());

const testFunc = () => {
    console.log('TEST FUNc');
};