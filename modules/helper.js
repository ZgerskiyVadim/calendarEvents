import calendarEvents from './calendarEvents';

export default (function () {
    let parsedDate = {};
    let parsedTime = {};

    return {
        createTimer(that) {

            console.log('this', that);
            return setInterval(() => {
                this.timeToFinish = this.timeToFinish - 1;
                console.log('eventName', this.eventName);
                console.log('timeToFinish', this.timeToFinish);
                if (this.timeToFinish <= 0) {
                    this.callback();
                    calendarEvents.deleteEvent(this.eventName);
                }
            }, 1000);
        },

        globalTimer() {
            const allEvents = calendarEvents.getEvents;
            console.log('Math.min', Math.min(...allEvents));
        },
        get getTimeToFinish() {
            const nowDate = new Date().getTime();
            const chosenDate = this.newDate.getTime();
            return parseInt((chosenDate - nowDate) / 1000);
        },

        get newDate() {
            return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
        },

        parseDate (date) {
            const arrayDate = date.split('.');
            const day = arrayDate[0];
            const month = arrayDate[1] - 1;
            const year = arrayDate[2];

            parsedDate =  {
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

            parsedTime = {
                hour,
                minute,
                second
            };
        }
    };
}());
