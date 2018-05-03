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
                    console.table(event);
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    console.table(event);
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

        unsubscribeAllEvents(eventName) {
            observer.unsubscribeByKey(eventName);
        },

        startAndRefreshTimer() {
            clearInterval(interval);
            const eventWithMinTime = events.length ? helperModule.minValueOfTime(events) : {};

            if (eventWithMinTime.timeToFinish > 0) {
                this.triggerSetInterval(eventWithMinTime);
            } else if (eventWithMinTime.timeToFinish <= 0) {
                console.error('Please enter valid date');
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
                    clearInterval(interval);
                    this.setEventsByTime = eventWithMinTime.timeToFinish;
                    observer.trigger(eventWithMinTime.eventName);
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

        trigger(eventName) {
            observer.trigger(eventName);
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