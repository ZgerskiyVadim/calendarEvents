(function (calendarEvents) {
    function getNewDateBeforeEvent(eventDate, secondsBeforeCall) {
        return new Date(parseInt(eventDate.getTime() - (secondsBeforeCall + 1) * MILISECONDS));
    }

    function isEqualDate(date) {
        const dateNow = new Date();
        return date.toString() === dateNow.toString();
    }

    function isValidSeconds(seconds) {
        if (!helperModule.isNumber(seconds)) {console.error('Seconds must be a number'); return false;}
        return true;
    }

    function isValidCallback(callback) {
        return helperModule.isFunction(callback);
    }

    calendarEvents.addFuncBeforeAllEvents = function(secondsBeforeEvent, callback) {
        if (!isValidSeconds(secondsBeforeEvent)) return;
        if (!isValidCallback(callback)) return;

        calendarEvents.addFuncForEvent(COUNTDOWN, () => {
            helperModule.handleEventsPending(this.getEvents)
                .forEach(event => {
                    event.newDateBeforeEvent = event.newDateBeforeEvent ? event.newDateBeforeEvent : getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    isEqualDate(event.newDateBeforeEvent) && callback();
                });
        });
    };

    calendarEvents.addFuncBeforeEventById = function(id, secondsBeforeEvent, callback) {
        if (!isValidSeconds(secondsBeforeEvent)) return;
        if (!isValidCallback(callback)) return;

        calendarEvents.addFuncForEvent(COUNTDOWN, () => {
            this.getEvents.forEach(event => {
                if (event.id === id && !event.isFinished) {
                    event.newDateBeforeEventById = event.newDateBeforeEventById ? event.newDateBeforeEventById : getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    isEqualDate(event.newDateBeforeEventById) && callback();
                }
            });
        });
    };

}(calendarEvents));
