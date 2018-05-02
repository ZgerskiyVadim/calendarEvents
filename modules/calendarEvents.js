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
            const timeToFinish = helperModule.getTimeInSeconds(date, time);
            const newDate = helperModule.newDate(date, time);
            const newEvent = {
                eventName,
                timeToFinish,
                newDate,
                callback
            };
            events.push(newEvent);
            observer.subscribe(eventName, callback);
            this.startAndRefreshTimer();
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(event => {
                if(event.callback === callback) {
                    const timeToFinish = helperModule.getTimeInSeconds(date, time);
                    this.setEventsByTime = secondsLeft;
                    event.eventName = eventName;
                    event.timeToFinish = timeToFinish;
                    observer.unsubscribe(event.callback);
                    observer.subscribe(event.eventName, callback);
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
                // eventWithMinTime.callback();
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
                    // eventWithMinTime.callback();
                    observer.trigger(eventWithMinTime.eventName);
                    clearInterval(interval);
                    this.setEventsByTime = eventWithMinTime.timeToFinish;
                    this.deleteEvent(eventWithMinTime.eventName);
                }
                console.log('countdown', countdown);
            }, 1000);
        },

        subscribe(eventName, callback) {
            observer.subscribe(eventName, callback);
        },

        get getEvents () {
            return events;
        },

        set setEventsByTime (minTime) {
            events.forEach(event => event.timeToFinish = event.timeToFinish - minTime);
        }
    };
}());

const testFunc = () => {
    console.log('TEST FUNc');
};

const testFunc1 = () => {
    console.log('TEST FUNc11111111111');
};


// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);
calendar.createEvent('1', '02.05.2018', '17:24:10', testFunc1);
calendar.createEvent('2', '02.05.2018', '17:24:20', testFunc);

setTimeout(() => {
    calendar.changeEvent('1', '02.05.2018', '17:24:30', testFunc1);
    calendar.deleteEvent('1');
}, 3000);



// calendar.createEvent('3', '28.04.2018', '15:46:50', testFunc1);
// calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('eventName');
export default calendar;