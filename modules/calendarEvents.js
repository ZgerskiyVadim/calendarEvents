const calendarEvents = (function () {
    const observer = new Observable();
    const events = [];
    let interval;
    let countdown = 0;

    function refreshTimer() {
        setTimeout(() => {observer.trigger(SHOW_EVENTS_IN_HTML);}, TIME_FOR_SHOW_IN_HTML); // show events in html
        clearInterval(interval);
        const lengthPendingEvents = helperModule.pendingEvents(events).length;

        if (lengthPendingEvents) {
            const closestEvent = helperModule.minValueOfTime(events);
            closestEvent.isActive = true;
            closestEvent.timeToFinish = helperModule.calculateDateDifference(closestEvent.newDate);
            countdown = closestEvent.timeToFinish;
            triggerSetInterval(closestEvent);
        } else {
            countdown = 0;
            observer.trigger(COUNTDOWN); // update countdown in html
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
                refreshTimer();
            }
        }, 1000);
    }

    function setEventsTimeToFinish() {
        events.forEach(event => !event.isFinished ? (event.timeToFinish = helperModule.calculateDateDifference(event.newDate)) : event.timeToFinish = 0);
    }

    function triggerEventsSameDate(closestEvent) {
        events.forEach(event => {
            if (!event.isFinished && (event.timeToFinish <= 0 || event.newDate.toString() === closestEvent.newDate.toString())) {
                event.isFinished = true;
                event.isActive = false;
                observer.trigger(event.id);
                observer.unsubscribe(event.id);
            }
        });
    }

    function createNewEvent(eventName, eventDate, callback) {
        const { date, time } = eventDate;
        const newDate = helperModule.newDate(date, time);
        if (!nameAndDateIsValid(eventName, newDate, callback)) return;
        if (!helperModule.isFunction(callback)) return;
        const timeToFinish = helperModule.calculateDateDifference(newDate);
        return {
            eventName,
            id: helperModule.generateId(),
            timeToFinish,
            newDate,
            callback
        };
    }

    function nameAndDateIsValid(eventName, newDate) {
        if (!helperModule.isString(eventName)) {console.error('Event name must be a string'); return false;}
        if (!newDate) return false;
        if (!helperModule.timeIsValid(newDate)) {console.error('Please enter valid date or time'); return false;}
        return true;
    }

    return {

        createEvent(eventName, eventDate, callback) {
            let newEvent = createNewEvent(eventName, eventDate, callback);
            if (!newEvent) return;

            this.subscribeOnEvent(newEvent.id, callback);
            events.push(newEvent);
            refreshTimer();
            return newEvent;
        },

        changeEvent(id, eventName, eventDate) {
            const { date, time } = eventDate;
            const newDate = helperModule.newDate(date, time);
            if (!helperModule.idIsValid(id)) return;
            if (!nameAndDateIsValid(eventName, newDate)) return;
            events.forEach(event => {
                if(event.id === id && !event.isFinished) {
                    const timeToFinish = helperModule.calculateDateDifference(newDate);
                    event = Object.assign(event, {eventName, timeToFinish, newDate, isActive: false});
                    setEventsTimeToFinish();
                    refreshTimer();
                }
            });
        },

        deleteEvent(id) {
            if (!helperModule.idIsValid(id)) return;
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    observer.unsubscribe(event.id);
                    events.splice(index, 1);
                    setEventsTimeToFinish();
                    refreshTimer();
                } else if(event.id === id) {
                    events.splice(index, 1);
                    refreshTimer(); // for show changes in html
                }
            });
        },

        subscribeOnEvent(key, func) {
            observer.subscribe(key, func);
        },

        get getEvents() {
            return events;
        },

        //show countdown in html
        get getCountdown() {
            return countdown;
        }
    };

}());
