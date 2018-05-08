import throwError from '../throwError';
import { COUNTDOWN } from '../constants';
import helperModule from './helper';
import Observable from './observer';


const calendarEvents = (function () {
    const observer = new Observable();
    let events = [];
    let interval;
    let countdown = 0;
    let secondsLeft = 0;

    function startTimer(newEvent) {
        if (newEvent.timeToFinish > 0) {
            calendarEvents.subscribe(newEvent.id, newEvent.callback);
            startAndRefreshTimer();
        } else {
            throwError('You can`t enter past date');
            events.forEach((event, index) => (event.id === newEvent.id) && events.splice(index, 1));
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
            calendarEvents.trigger(COUNTDOWN);

            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                closestEvent.isFinished = true;
                closestEvent.callback();
                setEventsByTime(closestEvent.timeToFinish);
                calendarEvents.unsubscribeFunc(closestEvent.callback);

                calendarEvents.trigger(closestEvent.id);
                startAndRefreshTimer();
            }
            console.log('countdown', countdown);
        }, 1000);
    }

    function setEventsByTime(secondsLeft) {
        events.forEach(event => !event.isFinished && (event.timeToFinish = event.timeToFinish - secondsLeft));
    }

    return {
        createEvent(eventName, date, time, callback, id) {
            const newDate = helperModule.newDate(date, time);
            if (!helperModule.dataIsValid(eventName, newDate, callback)) return;
            const timeToFinish = helperModule.calculateDateDifference(newDate);
            const newEvent = {
                eventName,
                id: id || helperModule.generateId(),
                timeToFinish,
                newDate,
                callback
            };

            events.push(newEvent);
            startTimer(newEvent);
        },

        changeEvent(id, eventName, date, time) {
            events.forEach(event => {
                if(event.id === id && !event.isFinished) {
                    const newDate = helperModule.newDate(date, time);
                    if (!helperModule.dataIsValid(eventName, newDate)) return;
                    const timeToFinish = helperModule.calculateDateDifference(newDate);
                    setEventsByTime(secondsLeft);
                    this.unsubscribeFunc(event.callback);
                    event.isActive = false;
                    event = Object.assign(event, {eventName, timeToFinish, newDate});
                    startTimer(event);
                }
            });
        },

        deleteEvent(id) {
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    this.unsubscribe(event.id);
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

        subscribe(key, func) {
            observer.subscribe(key, func);
        },

        unsubscribe(key) {
            observer.unsubscribe(key);
        },

        unsubscribeFunc(func) {
            observer.unsubscribeFunc(func);
        },

        trigger(key) {
            observer.trigger(key);
        }
    };
}());

export default calendarEvents;