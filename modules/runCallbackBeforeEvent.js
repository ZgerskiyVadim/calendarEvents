(function (calendarEvents) {

    calendarEvents.addFuncForEvent(DELETE_EVENT, (id) => {
        const event = calendarEvents.getEvents.filter(event => event.parentEventID === id)[0];
        event && calendarEvents.deleteEvent(event.id);
    });

    function getNewDateBeforeEvent(eventDate, secondsBeforeCall) {
        const date =  new Date(parseInt(eventDate.getTime() - (secondsBeforeCall + 1) * MILISECONDS));
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds() + 1;
        return {
            'date': `${day}.${month}.${year}`,
            'time': `${hours}:${minutes}:${seconds}`
        };
    }

    function ifChangeEventAddCallbackBeforeEvent(secondsBeforeEvent) {
        calendarEvents.addFuncForEvent(CHANGE_EVENT, (id) => {
            const event = helperModule.handleEventsPending(calendarEvents.getEvents).filter(event => !event.parentEventID && event.id === id)[0];
            if (event && event.isFuncBeforeEvent) {
                const beforeEventCallback = helperModule.handleEventsPending(calendarEvents.getEvents).filter(elem => elem.parentEventID === event.id)[0];
                const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                calendarEvents.changeEvent(beforeEventCallback.id, event.eventName, eventDate, beforeEventCallback.callback);
            }
        });
    }

    function changeSecondsCallbackBeforeEvents(secondsBeforeEvent,callback) {
        helperModule.handleEventsPending(calendarEvents.getEvents)
            .filter(event => !event.parentEventID)
            .forEach(event => {
                if (event.isCallbackBeforeEvent) {
                    const beforeEventCallback = calendarEvents.getEvents.filter(elem => elem.parentEventID === event.id)[0];
                    const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    calendarEvents.changeEvent(beforeEventCallback.id, beforeEventCallback.eventName, eventDate, beforeEventCallback.callback);
                } else {
                    calendarEvents.addFuncBeforeEventById(event.id, secondsBeforeEvent, callback);
                }
            });
    }

    function addCallbackBeforeEvent(event, secondsBeforeEvent) {
        const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
        const newEvent = calendarEvents.addNewEvent(event.eventName, eventDate, event.callback);
        event.isFuncBeforeEvent = true;
        event.isCallbackBeforeEvent = true;
        newEvent.isFuncBeforeEvent = true;
        newEvent.parentEventID = event.id;
    }

    calendarEvents.addFuncBeforeAllEvents = function(secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        changeSecondsCallbackBeforeEvents(secondsBeforeEvent, callback);
        ifChangeEventAddCallbackBeforeEvent(secondsBeforeEvent);
    };

    calendarEvents.addFuncBeforeEventById = function(id, secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        const event = helperModule.handleEventsPending(calendarEvents.getEvents).filter(event => !event.isFuncBeforeEvent && event.id === id)[0];
        event && addCallbackBeforeEvent(event, secondsBeforeEvent);
    };

}(calendarEvents));
