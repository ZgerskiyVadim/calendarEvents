(function (calendarEvents) {

    calendarEvents.addFuncForEvent(CHANGE_EVENT, (id) => {
        const changedEvent = calendarEvents.getEvents.filter(event => event.id === id)[0];
        calendarEvents.getEvents
            .filter(event => event.parentEventID === id)
            .forEach(callback => {
                const eventDate = getNewDateBeforeEvent(changedEvent.newDate, callback.secondsBeforeEvent);
                calendarEvents.changeEvent(callback.id, changedEvent.eventName, eventDate);
            });
    });

    calendarEvents.addFuncForEvent(DELETE_EVENT, (id) => {
        calendarEvents.getEvents
            .filter(event => event.parentEventID === id)
            .forEach(event => calendarEvents.deleteEvent(event.id));
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

    function changeSecondsCallbackBeforeEvents(secondsBeforeEvent, callback) {
        helperModule.handleEventsPending(calendarEvents.getEvents)
            .filter(event => !event.parentEventID)
            .forEach(event => {
                if (event.isCallbackBeforeEvent) {
                    const beforeEventCallback = calendarEvents.getEvents.filter(elem => !elem.isCreatedByEventID && elem.parentEventID === event.id)[0];
                    const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
                    calendarEvents.changeEvent(beforeEventCallback.id, beforeEventCallback.eventName, eventDate);
                } else {
                    event.isCallbackBeforeEvent = true;
                    const newEvent = createCallbackBeforeEvent(event, secondsBeforeEvent, callback);
                    newEvent.secondsBeforeEvent = secondsBeforeEvent;
                    newEvent.parentEventID = event.id;
                }
            });
    }

    function createCallbackBeforeEvent(event, secondsBeforeEvent, callback) {
        const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
        return calendarEvents.addNewEvent(event.eventName, eventDate, callback);
    }

    calendarEvents.addFuncBeforeAllEvents = function(secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        changeSecondsCallbackBeforeEvents(secondsBeforeEvent, callback);
    };

    calendarEvents.addFuncBeforeEventById = function(id, secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        const event = helperModule.handleEventsPending(calendarEvents.getEvents).filter(event => !event.parentEventID && event.id === id)[0];
        if (event) {
            event.isCallbackBeforeEventById = true;
            const newEvent = createCallbackBeforeEvent(event, secondsBeforeEvent, callback);
            newEvent.isCreatedByEventID = true;
            newEvent.secondsBeforeEvent = secondsBeforeEvent;
            newEvent.parentEventID = event.id;
        }
    };

}(calendarEvents));
