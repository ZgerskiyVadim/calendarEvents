import calendarEvents from '../main';

export default (function () {
    return {
        createTimer(newEvent) {
            newEvent.timer = setInterval(() => {
                newEvent.timeToFinish = newEvent.timeToFinish - 1;
                console.log('timeLeft', newEvent.timeToFinish);
                if (newEvent.timeToFinish <= 0) {
                    newEvent.event();
                    calendarEvents.deleteEvent(newEvent.nameOfEvent);
                }
            }, 1000);
        },

        parseData (date, time) {
            const dateObj = this.parseDate(date);
            const timeObj = this.parseTime(time);
            const dateNowInMiliSeconds = new Date().getTime();
            const dateBeforeFinishInMiliSeconds = new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second).getTime();
            const chosenDate = new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second);
            const timeToFinish = parseInt((dateBeforeFinishInMiliSeconds - dateNowInMiliSeconds) / 1000);
            console.log('timeToFinish', timeToFinish);
            return {
                timeToFinish,
                chosenDate
            };
        },

        parseDate (date) {
            const arrayDate = date.split('.');
            const day = arrayDate[0];
            const month = arrayDate[1] - 1;
            const year = arrayDate[2];

            return {
                day,
                month,
                year
            };
        },

        parseTime(time) {
            const arrayTime = time.split(':');
            const hour = arrayTime[0];
            const minute = arrayTime[1];
            const second = arrayTime[2];

            return {
                hour,
                minute,
                second
            };
        }
    };
}());