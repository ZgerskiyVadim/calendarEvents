const calendarEvents = (function () {
    const observer = new Observable();
    let events = [];
    let interval;
    let countdown = 0;

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
        setTimeout(() => {observer.trigger(SHOW_EVENTS_IN_HTML);}, NEEDED_TIME_SHOW_IN_HTML);
        const closestEvent = helperModule.minValueOfTime(events);
        const lengthNotFinished = helperModule.notFinishedEvents(events).length;

        if (lengthNotFinished) {
            closestEvent.isActive = true;
            closestEvent.timeToFinish = helperModule.calculateDateDifference(closestEvent.newDate);
            countdown = closestEvent.timeToFinish;
            triggerSetInterval(closestEvent);
        }
    }

    function triggerSetInterval(closestEvent) {
        interval = setInterval(() => {
            countdown = countdown - 1;
            observer.trigger(COUNTDOWN);

            if (countdown <= 0) {
                clearInterval(interval);
                triggerEventsSameDate(closestEvent);
                setEventsTimeToFinish();
                startAndRefreshTimer();
            }
        }, 1000);
    }

    function setEventsTimeToFinish() {
        events.forEach(event => !event.isFinished ? (event.timeToFinish = helperModule.calculateDateDifference(event.newDate)) : event.timeToFinish = 0);
    }

    function triggerEventsSameDate(closestEvent) {
        events.forEach(event => {
            if (event.timeToFinish <= 0 || event.newDate.toString() === closestEvent.newDate.toString()) {
                event.isFinished = true;
                event.isActive = false;
                observer.trigger(event.id);
                observer.unsubscribe(event.id);
            }
        });
    }

    return {

        createEvent(eventName, eventDate, callback) {
            const { date, time } = eventDate;
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
            return newEvent;
        },

        changeEvent(id, eventName, eventDate) {
            const { date, time } = eventDate;
            events.forEach(event => {
                if(event.id === id && !event.isFinished) {
                    const newDate = helperModule.newDate(date, time);
                    if (!helperModule.dataIsValid(eventName, newDate)) return;
                    const timeToFinish = helperModule.calculateDateDifference(newDate);
                    setEventsTimeToFinish();
                    observer.unsubscribeFunc(event.id, event.callback);
                    event = {...event, eventName, timeToFinish, newDate, isActive: false};
                    startTimer(event);
                }
            });
        },

        deleteEvent(id) {
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    observer.unsubscribe(event.id);
                    events.splice(index, 1);
                    setEventsTimeToFinish();
                    startAndRefreshTimer();
                } else if(event.id === id) {
                    events.splice(index, 1);
                    startAndRefreshTimer();
                }
            });
        },

        subscribe(key, func) {
            observer.subscribe(key, func);
        },

        get getEvents() {
            return events;
        },

        get getCountDown() {
            return countdown;
        }
    };
}());
