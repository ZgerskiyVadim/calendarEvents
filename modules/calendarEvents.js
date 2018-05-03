import helperModule from './helper';
import Observable from './observer';

const observer = new Observable();

const calendar = (function () {
    let events = [];
    let interval;
    let countdown = 0;
    let secondsLeft = 0;

    return {
        createEvent(eventName, date, time, callback) {
            const newDate = helperModule.newDate(date, time);
            const timeToFinish = helperModule.getTimeInSeconds(newDate);
            const newEvent = {
                eventName,
                timeToFinish,
                newDate,
                callback
            };
            events.push(newEvent);
            this.subscribe(eventName, callback);
            this.startAndRefreshTimer();
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(event => {
                if(event.callback === callback) {
                    const newDate = helperModule.newDate(date, time);
                    const timeToFinish = helperModule.getTimeInSeconds(newDate);
                    this.setEventsByTime = secondsLeft;

                    observer.unsubscribe(event.callback);
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    this.subscribe(event.eventName, callback);
                    this.startAndRefreshTimer();
                }
            });
        },

        deleteEvent(eventName) {
            events.forEach((event, index) => {
                if(event.eventName === eventName) {
                    observer.unsubscribe(event.callback);
                    events.splice(index, 1);
                    this.startAndRefreshTimer();
                }
            });
        },

        startAndRefreshTimer() {
            clearInterval(interval);
            const eventWithMinTime = events.length ? helperModule.minValueOfTime(events) : {};

            if (eventWithMinTime.timeToFinish > 0) {
                this.triggerSetInterval(eventWithMinTime);

            } else if (eventWithMinTime.callback) {
                observer.trigger(eventWithMinTime.eventName);
                this.deleteEvent(eventWithMinTime.eventName);
            }
        },

        triggerSetInterval(eventWithMinTime) {
            countdown = eventWithMinTime.timeToFinish;
            interval = setInterval(() => {
                countdown = countdown - 1;
                secondsLeft = secondsLeft + 1;
                if (countdown <= 0) {
                    secondsLeft = 0;
                    observer.trigger(eventWithMinTime.eventName);
                    clearInterval(interval);
                    this.setEventsByTime = eventWithMinTime.timeToFinish;
                    this.deleteEvent(eventWithMinTime.eventName);
                }
                console.log('countdown', countdown);
            }, 1000);
        },

        callCallbackBeforeEvent(seconds, callback) {
            setInterval(() => {
                if (countdown === seconds) {
                    callback();
                }
            });
        },

        subscribe(eventName, callback) {
            observer.subscribe(eventName, callback);
        },

        get getEvents () {
            return events;
        },

        set setEventsByTime (secondsLeft) {
            events.forEach(event => event.timeToFinish = event.timeToFinish - secondsLeft);
        }
    };
}());

export default calendar;