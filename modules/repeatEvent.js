import Observable from './observer';
import calendarEvents from './calendarEvents';
import helperModule from './helper';

const observer = new Observable();

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

            const timeToFinish = this.getTimeInSeconds(selectedDays);
            // calendarEvents.subscribe(eventName, () => {
            //     const timeToFinish = this.getTimeInSeconds(selectedDays);
            //     setInterval(() => {
            //         callback();
            //     }, secondsInDay);
            // });
            // calendarEvents.createEvent(eventName, date, time, callback);
        },

        getTimeInSeconds (selectedDays) {
            selectedDays = [4 , 1];
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
            const currentWeekDay = new Date().getDay();
            console.log('currentWeekDay', currentWeekDay);
            // const currentMonthDay = new Date().getDate();
            const currentMonthDay = 30;
            selectedDays = selectedDays
                .map(selectedWeekDay => {
                    const dayInMonth = selectedWeekDay - currentWeekDay + currentMonthDay;

                    if (dayInMonth <= currentMonthDay && (dayInMonth + 7) <= daysInCurrentMonth) {
                        return dayInMonth + 7;
                    } else if (dayInMonth >= daysInCurrentMonth) {
                        const monthDay = Math.abs(daysInCurrentMonth - dayInMonth) ? Math.abs(daysInCurrentMonth - dayInMonth) : daysInCurrentMonth
                        return monthDay;
                    } else {
                        return dayInMonth;
                    }
                })
                .map(selectedMonthDay => {
                    console.log('selectedMonthDay', selectedMonthDay);
                });

            console.log('selectedDays', selectedDays);
        }
    };
}());

repeatEvent.getTimeInSeconds();


// repeatEvent.everyDay('hell', '02.05.2018', '18:06:30', function () {
//     console.log('REPEAT');
// });

export default repeatEvent;