import helperModule from './helper';

export default (function () {
    const secondsInDay = 86400 * 1000;
    return {
        everyDay(eventName, date, time, event) {
            setInterval(() => {
                calendarEvents.createEvent(eventName, date, time, event);
            }, secondsInDay);
        },
        everySelectedDay(eventName, date, time, event, ...selectedDays) {
            const currentDayOfWeek = new Date().getDay();
            helperModule.parseDate(date);
            helperModule.parseTime(time);
            const chosenDayOfEvent = helperModule.newDate.getDay();
            // console.log(currentDayOfWeek);
            // console.log('chosenDayOfEvent', chosenDayOfEvent);
            // console.log('includes', selectedDays.includes(currentDayOfWeek));
        }
    };
}());

