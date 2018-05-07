import calendarEvents from './calendarEvents';

export default (function () {

    return {
        forAllEvents (secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe('countdown', () => {
                if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                    callback();
                }
            });
        },

        byEventName (eventName, secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe('countdown', () => {
                const activeEvent = calendarEvents.getEvents.filter(event => event.isActive);
                if (calendarEvents.getCountDown === secondsBeforeCallEvent && eventName === activeEvent[0].eventName) {
                    callback();
                }
            });
        }
    };
}());
