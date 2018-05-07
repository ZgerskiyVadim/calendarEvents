import calendarEvents from './calendarEvents';


const repeatEvent = (function () {
    const numberOfMonthInYear = 12;
    const daysInWeek = 7;

    function countOfDaysToClosetsDayOfWeek(selectedDays) {
        const currentDayOfWeek = new Date().getDay();

        return selectedDays
            .map(selectedDay =>
                (selectedDay - currentDayOfWeek) < 0 ?
                    daysInWeek - (currentDayOfWeek - selectedDay) :
                    (selectedDay - currentDayOfWeek) ? (selectedDay - currentDayOfWeek) : daysInWeek)
            .reduce((prev, curr) => prev < curr ? prev : curr);
    }

    function getDateOfNewDay (addDaysBeforeTriggerEvent) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        const daysInCurrentMonth =  new Date(year, month, 0).getDate();
        let day = new Date().getDate();

        day = day + addDaysBeforeTriggerEvent;

        if (day >  daysInCurrentMonth) {
            day = day - daysInCurrentMonth;
            month = month + 1;
        }
        if (month > numberOfMonthInYear) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': `${day}.${month}.${year}`,
            'time': `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        };
    }

    return {
        everyDay(eventName, date, time, callback) {
            calendarEvents.createEvent(eventName, date, time, callback);

            calendarEvents.subscribe(eventName, function () {
                const dateOfnextDay = getDateOfNewDay(1);
                calendarEvents.createEvent(eventName, dateOfnextDay.date, dateOfnextDay.time, callback);
            });
        },

        everySelectedDay(eventName, date, time, callback, ...selectedDays) {
            calendarEvents.createEvent(eventName, date, time, callback);

            calendarEvents.subscribe(eventName, function () {
                const countOfDays = countOfDaysToClosetsDayOfWeek(selectedDays);
                const dateOfnextDay = getDateOfNewDay(countOfDays);
                calendarEvents.createEvent(eventName, dateOfnextDay.date, dateOfnextDay.time, callback);
            });
        }
    };
}());

export default repeatEvent;