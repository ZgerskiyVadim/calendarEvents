import calendarEvents from './calendarEvents';

const repeatEvent = (function () {
    const secondsInDay = 86400 * 1000;
    return {
        everyDay(eventName, date, time, callback) {
            calendarEvents.subscribe(eventName, () => {
                setInterval(() => {
                    callback();
                }, secondsInDay);
            });
            calendarEvents.createEvent(eventName, date, time, callback);
        },

        everySelectedDay(eventName, date, time, callback, ...selectedDays) {
            const timeToFinish = this.getTimeInSecondsToClosestSelectedDay(selectedDays);
            calendarEvents.subscribe(eventName, () => {
                this.timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
            });
            calendarEvents.createEvent(eventName, date, time, callback);
        },

        timeoutForEveryDay (callback) {
            setTimeout(() => {
                callback();
                this.timeoutForEveryDay(callback);
            }, secondsInDay);
        },

        timeoutForEverySelectedDay (selectedDays, timeToFinish, callback) {
            setTimeout(() => {
                callback();
                timeToFinish = this.getTimeInSecondsToClosestSelectedDay(selectedDays);
                this.timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
            }, timeToFinish);
        },

        getTimeInSecondsToClosestSelectedDay (selectedDays) {
            selectedDays = selectedDays.map(day => day === 0 ? day + 7 : day);
            const daysBeforeSelectedDay = getDaysToClosestSelectedDay(selectedDays);
            return secondsInDay * daysBeforeSelectedDay;
        }
    };
}());

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