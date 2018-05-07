import helperModule from './helper';
import Observable from './observer';


const calendarEvents = (function () {
    const observer = new Observable();
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
            deleteEventFromArray(newEvent);
        }
    }

    function startAndRefreshTimer() {
        clearInterval(interval);
        const eventWithMinTime = events.length ? helperModule.minValueOfTime(events) : {};

        if (eventWithMinTime.timeToFinish) {
            eventWithMinTime.isActive = true;
            triggerSetInterval(eventWithMinTime);
        }
    }

    function triggerSetInterval(eventWithMinTime) {
        countdown = eventWithMinTime.timeToFinish;

        interval = setInterval(() => {
            countdown = countdown - 1;
            secondsLeft = secondsLeft + 1;
            calendarEvents.trigger('countdown');

            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                eventWithMinTime.callback();
                calendarEvents.setEventsByTime = eventWithMinTime.timeToFinish;
                calendarEvents.unsubscribeFunc(eventWithMinTime.callback);
                deleteEventFromArray(eventWithMinTime);

                calendarEvents.trigger(eventWithMinTime.eventName);
                startAndRefreshTimer();
            }
            console.log('countdown', countdown);
        }, 1000);
    }

    function deleteEventFromArray(chosenEvent) {
        events.forEach((event, index) => (event.eventName === chosenEvent.eventName) && events.splice(index, 1));
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
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(event => {
                if(event.callback === callback) {
                    const newDate = helperModule.newDate(date, time);
                    const timeToFinish = helperModule.getTimeInSeconds(newDate);
                    this.setEventsByTime = secondsLeft;
                    calendarEvents.subscriberUpdateKey(event.eventName, eventName);
                    event.isActive = false;
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    checkValidOfTime(event);
                }
            });
        },

        deleteEvent(eventName) {
            events.forEach((event, index) => {
                if(event.eventName === eventName) {
                    calendarEvents.unsubscribe(event.eventName);
                    events.splice(index, 1);
                    this.setEventsByTime = secondsLeft;
                    startAndRefreshTimer();
                }
            });
        },

        get getEvents () {
            return events;
        },

        set setEventsByTime (secondsLeft) {
            events.forEach(event => event.timeToFinish = event.timeToFinish - secondsLeft);
        },

        get getCountDown () {
            return countdown;
        },

        subscribe(eventName, func) {
            observer.subscribe(eventName, func);
        },

        unsubscribe(key) {
            observer.unsubscribe(key);
        },

        unsubscribeFunc(func) {
            observer.unsubscribeFunc(func);
        },

        subscriberUpdateKey(currentKey, newKey) {
            observer.updateKey(currentKey, newKey);
        },

        trigger(eventName) {
            observer.trigger(eventName);
        }
    };
}());

export default calendarEvents;