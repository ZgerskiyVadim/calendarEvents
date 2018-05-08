import calendarEvents from './calendarEvents';
import { COUNTDOWN } from '../constants';

export default (function () {

    return {
        forAllEvents (secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe(COUNTDOWN, () => {
                if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                    callback();
                }
            });
        },

        byEventName (eventName, secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe(COUNTDOWN, () => {
                const activeEvent = calendarEvents.getEvents.filter(event => event.isActive);
                if (calendarEvents.getCountDown === secondsBeforeCallEvent && eventName === activeEvent[0].eventName) {
                    callback();
                }
            });
        }
    };
}());
