const calendarEvents = (function () {
    const observer = new Observable();
    const events = [];
    let interval;
    let countdown = 0;

    function setClosestEvent() {
        setTimeout(() => {observer.trigger(SHOW_EVENTS_IN_HTML);}, TIME_FOR_SHOW_IN_HTML); // show events in html
        clearInterval(interval);
        const lengthEventsPending = helperModule.handleEventsPending(events).length;

        if (lengthEventsPending) {
            const closestEvent = helperModule.getMinTimeValue(events);
            closestEvent.isActive = true;
            closestEvent.timeToFinish = helperModule.getDateDifference(closestEvent.newDate);
            countdown = closestEvent.timeToFinish;
            runTimer(closestEvent);
        } else {
            countdown = 0;
            observer.trigger(COUNTDOWN); // update countdown in html
        }
    }

    function runTimer(closestEvent) {
        interval = setInterval(() => {
            countdown = countdown - 1;
            observer.trigger(COUNTDOWN);

            if (countdown === 0) {
                clearInterval(interval);
                setFinishedEvents(closestEvent);
                setEventsToFinish();
                setClosestEvent();
            }
        }, 1000);
    }

    function setEventsToFinish() {
        events.forEach(event => !event.isFinished ? (event.timeToFinish = helperModule.getDateDifference(event.newDate)) : event.timeToFinish = 0);
    }

    function setFinishedEvents(closestEvent) {
        events.forEach(event => {
            if (!event.isFinished && (event.newDate.toString() === closestEvent.newDate.toString())) {
                event.isFinished = true;
                event.isActive = false;
                observer.trigger(event.id);
                observer.unsubscribe(event.id);
            }
        });
    }

    function getNewEvent(eventName, eventDate, callback) {
        const { date, time } = eventDate;
        const newDate = helperModule.getFormatDate(date, time);
        if (!nameAndDateIsValid(eventName, newDate)) return;
        if (!helperModule.isFunction(callback)) return;
        const timeToFinish = helperModule.getDateDifference(newDate);
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
        if (!helperModule.isFinishedTime(newDate)) {console.error('Please enter valid date or time'); return false;}
        return true;
    }

    return {

        addNewEvent(eventName, eventDate, callback) {
            let newEvent = getNewEvent(eventName, eventDate, callback);
            if (!newEvent) return;

            this.addFuncForEvent(newEvent.id, callback);
            events.push(newEvent);
            setClosestEvent();
            return newEvent;
        },

        changeEvent(id, eventName, eventDate) {
            const { date, time } = eventDate;
            const newDate = helperModule.getFormatDate(date, time);
            if (!nameAndDateIsValid(eventName, newDate)) return;
            events.forEach(event => {
                if(event.id === id && !event.isFinished) {
                    const timeToFinish = helperModule.getDateDifference(newDate);
                    event = Object.assign(event, {eventName, timeToFinish, newDate, isActive: false});
                    setEventsToFinish();
                    setClosestEvent();
                }
            });
        },

        deleteEvent(id) {
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    observer.unsubscribe(event.id);
                    events.splice(index, 1);
                    setEventsToFinish();
                    setClosestEvent();
                } else if(event.id === id) {
                    events.splice(index, 1);
                    setClosestEvent(); // for show changes in html
                }
            });
        },

        addFuncForEvent(key, func) {
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
