(function (calendarEvents) {

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

    // Изменить этот приватный метод, добавить к каждому ивенту(до ивента) свойтсво с количеством секунд до вызова основного ивента.
    // function ifChangeEventAddCallbackBeforeEvent(secondsBeforeEvent) {
    //     calendarEvents.addFuncForEvent(CHANGE_EVENT, (id) => {
    //         const events = helperModule.handleEventsPending(calendarEvents.getEvents).filter(event => (event.isCallbackBeforeEvent || event.isCallbackBeforeEventById) && event.id === id);
    //         events.forEach(event => {
    //             const beforeEventCallback = helperModule.handleEventsPending(calendarEvents.getEvents).filter(elem => elem.parentEventID === event.id)[0];
    //             const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
    //             calendarEvents.changeEvent(beforeEventCallback.id, event.eventName, eventDate);
    //         });
    //     });
    // }

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
                    const newEvent = addCallbackBeforeEvent(event, secondsBeforeEvent, callback);
                    newEvent.parentEventID = event.id;
                }
            });
    }

    function addCallbackBeforeEvent(event, secondsBeforeEvent, callback) {
        const eventDate = getNewDateBeforeEvent(event.newDate, secondsBeforeEvent);
        return calendarEvents.addNewEvent(event.eventName, eventDate, callback);
    }

    calendarEvents.addFuncBeforeAllEvents = function(secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        changeSecondsCallbackBeforeEvents(secondsBeforeEvent, callback);
        // ifChangeEventAddCallbackBeforeEvent(secondsBeforeEvent);
    };

    calendarEvents.addFuncBeforeEventById = function(id, secondsBeforeEvent, callback) {
        if (!validationService.isValidSeconds(secondsBeforeEvent)) return;
        if (!validationService.isFunction(callback)) return;

        const event = helperModule.handleEventsPending(calendarEvents.getEvents).filter(event => !event.parentEventID && event.id === id)[0];
        if (event) {
            event.isCallbackBeforeEventById = true;
            const newEvent = addCallbackBeforeEvent(event, secondsBeforeEvent, callback);
            newEvent.isCreatedByEventID = true;
            newEvent.parentEventID = event.id;
        }
    };

}(calendarEvents));
