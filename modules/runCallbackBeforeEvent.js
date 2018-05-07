import calendarEvents from './calendarEvents';

export default (function () {

    return {
        forAllEvents (secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe('countdown', () => {
                if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                    callback();
                }
            });
        }
    };
}());
