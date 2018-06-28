(function (calendarEvents) {

    function getNewDateBeforeEvent(eventDate, secondsBeforeCall) {
        return new Date(parseInt(eventDate.getTime() - (secondsBeforeCall + 1) * MILISECONDS));
    }

    function isEqualDate(eventDate) {
        return eventDate.toString() === new Date().toString();
    }

    calendarEvents.addFuncBeforeAllEvents = function(secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        calendarEvents.addFuncForEvent(COUNTDOWN, () => {
            helperModule.handleEventsPending(this.getEvents)
                .forEach(event => {
                    event.newDateBeforeEvent = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    isEqualDate(event.newDateBeforeEvent) && callback();
                });
        });
    };

    calendarEvents.addFuncBeforeEventById = function(id, secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        calendarEvents.addFuncForEvent(COUNTDOWN, () => {
            this.getEvents.forEach(event => {
                if (event.id === id && !event.isFinished) {
                    event.newDateBeforeEventById = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    isEqualDate(event.newDateBeforeEventById) && callback();
                }
            });
        });
    };

}(calendarEvents));
