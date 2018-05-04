import calendarEvents from './calendarEvents';

const secondsInDay = 86400 * 1000;
const numberOfMonthInYear = 12;

const repeatEvent = (function () {

    return {
        everyDay(eventName, date, time, callback) {
            calendarEvents.createEvent(eventName, date, time, callback);

            calendarEvents.subscribe(eventName, function KYRVA() {
                const nextDay = getDateOfNewDay(1);
                calendarEvents.createEvent(eventName, nextDay.date, nextDay.time, callback);
            });
        },

        everySelectedDay(eventName, date, time, callback, ...selectedDays) {
            const timeToFinish = getTimeInSecondsToClosestSelectedDay(selectedDays);
            calendarEvents.subscribe(eventName, () => {
                timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
            });
            calendarEvents.createEvent(eventName, date, time, callback);
        }
    };
}());

function getDateOfNewDay (addDaysBeforeTriggerEvent) {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    const daysInCurrentMonth =  new Date(year, month, 0).getDate();
    let day = new Date().getDate();

    // day = day + addDaysBeforeTriggerEvent;
    //
    // if (day >  daysInCurrentMonth) {
    //     day = day - daysInCurrentMonth;
    //     month = month + 1;
    // }
    // if (month > numberOfMonthInYear) {
    //     month = 1;
    //     year = year + 1;
    // }

    return {
        'date': `${day}.${month}.${year}`,
        'time': `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds() + 4}`
    };
}

console.log(getDateOfNewDay(1));

function timeoutForEverySelectedDay (selectedDays, timeToFinish, callback) {
    setTimeout(() => {
        callback();
        timeToFinish = getTimeInSecondsToClosestSelectedDay(selectedDays);
        timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
    }, timeToFinish);
}

function getTimeInSecondsToClosestSelectedDay (selectedDays) {
    selectedDays = selectedDays.map(day => day === 0 ? day + 7 : day);
    const daysBeforeSelectedDay = getDaysToClosestSelectedDay(selectedDays);
    return secondsInDay * daysBeforeSelectedDay;
}

function getDaysToClosestSelectedDay(selectedDays) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    const currentWeekDay = new Date().getDay();
    const currentMonthDay = new Date().getDate();

    const closestDayOfMonth = selectedDays
        .map(selectedWeekDay => {
            let dayInMonth = selectedWeekDay - currentWeekDay + currentMonthDay;
            if ((dayInMonth - currentMonthDay) <= 0) {
                return (dayInMonth + 7 <= daysInCurrentMonth) ? (dayInMonth + 7) : (dayInMonth + 7 - daysInCurrentMonth);
            } else {
                return dayInMonth > daysInCurrentMonth ? dayInMonth - daysInCurrentMonth : dayInMonth;
            }
        })
        .reduce((prev, curr) => prev < curr ? prev : curr);

    return (closestDayOfMonth - currentMonthDay);
}

export default repeatEvent;