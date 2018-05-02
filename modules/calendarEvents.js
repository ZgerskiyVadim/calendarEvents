import helperModule from './helper';

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
            this.startAndRefreshTimer();
        },

        changeEvent(eventName, date, time, callback) {
            events.forEach(elem => {
                if(elem.callback === callback) {
                    const timeToFinish = helperModule.getTimeInSeconds(date, time);
                    this.setEventsByTime = secondsLeft;
                    elem.eventName = eventName;
                    elem.timeToFinish = timeToFinish;
                    this.startAndRefreshTimer();
                }
            });
        },

        deleteEvent(eventName) {
            events.forEach((elem, index) => {
                if(elem.eventName === eventName) {
                    events.splice(index, 1);
                    this.startAndRefreshTimer();
                }
            });
        },

        startAndRefreshTimer() {
            clearInterval(interval);
            const minEvent = events.length ? helperModule.minValueOfTime(events) : {};

            if (minEvent.timeToFinish > 0) {
                countdown = minEvent.timeToFinish;
                interval = setInterval(() => {
                    countdown = countdown - 1;
                    secondsLeft = secondsLeft + 1;
                    if (countdown <= 0) {
                        secondsLeft = 0;
                        minEvent.callback();
                        clearInterval(interval);
                        this.setEventsByTime = minEvent.timeToFinish;
                        this.deleteEvent(minEvent.eventName);
                    }
                }, 1000);
            } else if (minEvent.callback) {
                minEvent.callback();
                this.deleteEvent(minEvent.eventName);
            }
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
calendar.createEvent('1', '02.05.2018', '16:54:40', testFunc1);
calendar.createEvent('2', '02.05.2018', '16:54:50', testFunc);

setTimeout(() => {
    calendar.changeEvent('1', '02.05.2018', '14:35:30', testFunc1);
}, 3000);

// calendar.createEvent('3', '28.04.2018', '15:46:50', testFunc1);
// calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('eventName');
export default calendar;