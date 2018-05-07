import helperModule from './helper';
import Observable from './observer';


export default (function () {
    const observer = new Observable();
    let events = [];
    let interval;
    let countdown = 0;
    let secondsLeft = 0;

    function startTimer(newEvent) {
        if (newEvent.timeToFinish > 0) {
            this.subscribe(newEvent.eventName, newEvent.callback);
            startAndRefreshTimer();
        } else {
            console.error('Please enter valid date');
            deleteEventFromArray(newEvent);
        }
    }

    function startAndRefreshTimer() {
        clearInterval(interval);
        const closestEvent = events.length ? helperModule.minValueOfTime(events) : {};

        if (closestEvent.timeToFinish) {
            closestEvent.isActive = true;
            triggerSetInterval(closestEvent);
        }
    }

    function triggerSetInterval(closestEvent) {
        countdown = closestEvent.timeToFinish;

        interval = setInterval(() => {
            countdown = countdown - 1;
            secondsLeft = secondsLeft + 1;
            this.trigger('countdown');

            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                closestEvent.callback();
                setEventsByTime(closestEvent.timeToFinish);
                this.unsubscribeFunc(closestEvent.callback);
                deleteEventFromArray(closestEvent);

                this.trigger(closestEvent.eventName);
                startAndRefreshTimer();
            }
            console.log('countdown', countdown);
        }, 1000);
    }

    function setEventsByTime(secondsLeft) {
        events.forEach(event => event.timeToFinish = event.timeToFinish - secondsLeft);
    }

    function deleteEventFromArray(chosenEvent) {
        events.forEach((event, index) => (event.eventName === chosenEvent.eventName) && events.splice(index, 1));
    }

    return {
        createEvent(eventName, date, time, callback) {
            const newDate = helperModule.newDate(date, time);
            const timeToFinish = helperModule.calculateDateDifference(newDate);
            const newEvent = {
                eventName,
                timeToFinish,
                newDate,
                callback
            };

            events.push(newEvent);
            startTimer(newEvent);
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(event => {
                if(event.callback === callback) {
                    const newDate = helperModule.newDate(date, time);
                    const timeToFinish = helperModule.calculateDateDifference(newDate);
                    setEventsByTime(secondsLeft);
                    this.subscriberUpdateKey(event.eventName, eventName);
                    this.unsubscribeFunc(event.callback);
                    event.isActive = false;
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    startTimer(event);
                }
            });
        },

        deleteEvent(eventName) {
            events.forEach((event, index) => {
                if(event.eventName === eventName) {
                    this.unsubscribe(event.eventName);
                    events.splice(index, 1);
                    setEventsByTime(secondsLeft);
                    startAndRefreshTimer();
                }
            });
        },

        get getEvents () {
            return events;
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
