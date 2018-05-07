import calendarEvents from './calendarEvents';

const runCallbackBeforeEvent = (function () {

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

export default runCallbackBeforeEvent;