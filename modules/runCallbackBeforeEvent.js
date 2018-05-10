(function (calendarEvents) {

    calendarEvents.forAllEvents = function(secondsBeforeCallEvent, callback) {
        observer.subscribe(COUNTDOWN, () => {
            if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                callback();
            }
        });
    };

    calendarEvents.byEventId = function(id, secondsBeforeCallEvent, callback) {
        observer.subscribe(COUNTDOWN, () => {
            const activeEvent = calendarEvents.getEvents.filter(event => event.isActive);
            if (calendarEvents.getCountDown === secondsBeforeCallEvent && id === activeEvent[0].id) {
                callback();
            }
        });
    };
}(calendarEvents));
