const calendarEvents = (function () {
    const observer = new Observable();
    let events = [];
    let interval;
    let countdown = 0;
    let secondsLeft = 0;

    function startTimer(newEvent) {
        if (newEvent.timeToFinish < 0) {
            console.error('You can`t enter past date');
            events.forEach((event, index) => (event.id === newEvent.id) && events.splice(index, 1));
        } else {
            observer.subscribe(newEvent.id, newEvent.callback);
            startAndRefreshTimer();
        }
    }

    function startAndRefreshTimer() {
        clearInterval(interval);
        setTimeout(() => {observer.trigger(SHOW_EVENTS_IN_HTML);}, 50);
        const closestEvent = helperModule.minValueOfTime(events);
        const lengthNotFinished = helperModule.notFinishedEvents(events).length;

        if (lengthNotFinished) {
            closestEvent.isActive = true;
            triggerSetInterval(closestEvent);
        }
    }

    function triggerSetInterval(closestEvent) {
        countdown = closestEvent.timeToFinish;

        interval = setInterval(() => {
            countdown = countdown - 1;
            secondsLeft = secondsLeft + 1;
            observer.trigger(COUNTDOWN);

            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                closestEvent.isFinished = true;
                closestEvent.isActive = false;
                closestEvent.callback();
                setEventsByTime(closestEvent.timeToFinish);
                observer.unsubscribeFunc(closestEvent.id, closestEvent.callback);

                observer.trigger(closestEvent.id);
                startAndRefreshTimer();
            }
        }, 1000);
    }

    function setEventsByTime(secondsLeft) {
        events.forEach(event => !event.isFinished && (event.timeToFinish = event.timeToFinish - secondsLeft));
    }

    return {

        createEvent(eventName, date, time, callback) {
            const newDate = helperModule.newDate(date, time);
            if (!helperModule.dataIsValid(eventName, newDate, callback)) return;
            const timeToFinish = helperModule.calculateDateDifference(newDate);
            const newEvent = {
                eventName,
                id: helperModule.generateId(),
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
                    observer.unsubscribeFunc(event.id, event.callback);
                    event = Object.assign(event, {eventName, timeToFinish, newDate, isActive: false});
                    startTimer(event);
                }
            });
        },

        deleteEvent(id) {
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    observer.unsubscribe(event.id);
                    events.splice(index, 1);
                    setEventsByTime(secondsLeft);
                    startAndRefreshTimer();
                }
            });
        },

        subscribe(key, func) {
            observer.subscribe(key, func);
        },

        get getEvents () {
            return events;
        },

        get getCountDown () {
            return countdown;
        }
    };
}());
