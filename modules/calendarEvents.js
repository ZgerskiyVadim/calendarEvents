import helperModule from './helper';
import Observable from './observer';

const observer = new Observable();

const calendarEvents = (function () {
    let events = [];
    let interval;
    let countdown = 0;
    let secondsLeft = 0;

    function checkValidOfTime(newEvent) {
        if (newEvent.timeToFinish > 0) {
            calendarEvents.subscribe(newEvent.eventName, newEvent.callback);
            startAndRefreshTimer();
        } else {
            console.error('Please enter valid date');
            const events = calendarEvents.getEvents;
            events.forEach((event, index) => event.name === newEvent.name ? events.splice(index, 1) : undefined);
        }
    }

    function startAndRefreshTimer() {
        clearInterval(interval);
        const eventWithMinTime = events.length ? helperModule.minValueOfTime(events) : {};

        if (eventWithMinTime.timeToFinish) {
            triggerSetInterval(eventWithMinTime);
        }
    }

    function triggerSetInterval(eventWithMinTime) {
        countdown = eventWithMinTime.timeToFinish;
        interval = setInterval(() => {
            countdown = countdown - 1;
            secondsLeft = secondsLeft + 1;
            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                eventWithMinTime.callback();
                calendarEvents.setEventsByTime = eventWithMinTime.timeToFinish;
                calendarEvents.unsubscribeFunc(eventWithMinTime.callback);
                //ydalit` event iz massiva вынести в отдельную функцию
                events.forEach((event, index) => event.eventName === eventWithMinTime.eventName ? events.splice(index, 1) : undefined);

                calendarEvents.trigger(eventWithMinTime.eventName);
                startAndRefreshTimer();

            }
            console.log('countdown', countdown);
        }, 1000);
    }

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
            checkValidOfTime(newEvent);
            console.table(events);
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(event => {
                if(event.callback === callback) {
                    const newDate = helperModule.newDate(date, time);
                    const timeToFinish = helperModule.getTimeInSeconds(newDate);
                    this.setEventsByTime = secondsLeft;
                    observer.updateKey(event.eventName, eventName);
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    checkValidOfTime(event);
                }
            });
        },

        deleteEvent(eventName) {
            events.forEach((event, index) => {
                if(event.eventName === eventName) {
                    observer.unsubscribe(event.eventName);
                    events.splice(index, 1);
                    startAndRefreshTimer();
                }
            });
        },

        callCallbackBeforeEvent(seconds, callback) {
            setInterval(() => {
                if (countdown === seconds) {
                    callback();
                }
            });
        },

        get getEvents () {
            return events;
        },

        set setEventsByTime (secondsLeft) {
            events.forEach(event => event.timeToFinish = event.timeToFinish - secondsLeft);
        },

        subscribe(eventName, func) {
            observer.subscribe(eventName, func);
        },

        unsubscribeFunc(func) {
            observer.unsubscribeFunc(func);
        },

        unsubscribe(key) {
            observer.unsubscribe(key);
        },

        trigger(eventName) {
            observer.trigger(eventName);
        }
    };
}());

export default calendarEvents;