import { COUNTDOWN } from '../constants';
import calendarEvents from './calendarEvents';


export default (function () {

    return {
        forAllEvents (secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe(COUNTDOWN, () => {
                if (calendarEvents.getCountDown === secondsBeforeCallEvent) {
                    callback();
                }
            });
        },

        byEventId (id, secondsBeforeCallEvent, callback) {
            calendarEvents.subscribe(COUNTDOWN, () => {
                const activeEvent = calendarEvents.getEvents.filter(event => event.isActive);
                if (calendarEvents.getCountDown === secondsBeforeCallEvent && id === activeEvent[0].id) {
                    callback();
                }
            });
        }
    };
}());
