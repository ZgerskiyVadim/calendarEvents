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
            countdown = helperModule.getDateDifference(closestEvent.newDate);
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
                setClosestEvent();
            }
        }, 1000);
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
        if (!validationService.isValidNameAndDate(eventName, newDate)) return;
        if (!validationService.isFunction(callback)) return;
        return {
            eventName,
            id: helperModule.generateId(),
            newDate,
            callback
        };
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
            if (!validationService.isValidNameAndDate(eventName, newDate)) return;
            events.forEach(event => {
                if(event.id === id && !event.isFinished) {
                    event = Object.assign(event, {eventName, newDate, isActive: false});
                    setClosestEvent();
                }
            });
        },

        deleteEvent(id) {
            events.forEach((event, index) => {
                if(event.id === id && !event.isFinished) {
                    observer.unsubscribe(event.id);
                    events.splice(index, 1);
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
