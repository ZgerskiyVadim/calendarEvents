(function (calendarEvents) {

    calendarEvents.forAllEvents = function(secondsBeforeCallEvent, callback) {
        calendarEvents.subscribeOnEvent(COUNTDOWN, () => {
            if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                callback();
            }
        });
    };

    calendarEvents.byEventId = function(id, secondsBeforeCallEvent, callback) {
        calendarEvents.subscribeOnEvent(COUNTDOWN, () => {
            const activeEvent = calendarEvents.getEvents.filter(event => event.isActive);
            if (calendarEvents.getCountDown === secondsBeforeCallEvent && id === activeEvent[0].id) {
                callback();
            }
        });
    };
}(calendarEvents));
