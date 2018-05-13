(function (calendarEvents) {
    function getNewDateBeforeEvent(eventDate, secondsBeforeCall) {
        return new Date(parseInt(eventDate.getTime() - (secondsBeforeCall + 1) * MILISECONDS));
    }

    function isEqualDate(date) {
        const dateNow = new Date();
        return date.toString() === dateNow.toString();
    }

    function secondsAndCallbackIsValid(seconds, callback) {
        if (!helperModule.isNumber(seconds)) {console.error('Seconds must be a number'); return false;}
        return !helperModule.isFunction(callback);
    }

    calendarEvents.beforeEventsCallFunc = function(secondsBeforeCallEvent, callback) {
        if (!secondsAndCallbackIsValid(secondsBeforeCallEvent, callback)) return;

        calendarEvents.subscribeOnEvent(COUNTDOWN, () => {
            helperModule.pendingEvents(this.getEvents)
                .forEach(event => {
                    event.newDateBeforeEvent = event.newDateBeforeEvent ? event.newDateBeforeEvent : getNewDateBeforeEvent(event.newDate, secondsBeforeCallEvent);
                    isEqualDate(event.newDateBeforeEvent) && callback();
                });
        });
    };

    calendarEvents.beforeEventByIdCallFunc = function(id, secondsBeforeCallEvent, callback) {
        if (!helperModule.idIsValid(id)) return;
        if (!secondsAndCallbackIsValid(secondsBeforeCallEvent, callback)) return;

        calendarEvents.subscribeOnEvent(COUNTDOWN, () => {
            this.getEvents.forEach(event => {
                if (event.id === id && !event.isFinished) {
                    event.newDateBeforeEventById = event.newDateBeforeEventById ? event.newDateBeforeEventById : getNewDateBeforeEvent(event.newDate, secondsBeforeCallEvent);
                    isEqualDate(event.newDateBeforeEventById) && callback();
                }
            });
        });
    };
}(calendarEvents));
