import calendarEvents from './modules/calendarEvents';
import getEvents from './modules/getEventsForPeriod';
import repeatEvent from './modules/repeatEvent';
import runCallbackBeforeEvent from './modules/runCallbackBeforeEvent';


const anotherTestFunc = () => {
    console.log('Another test function');
};

const testFunc = () => {
    console.log('Test function');
};

function hey() {
    console.log('HELLO');
}

// runCallbackBeforeEvent.forAllEvents(5, testFunc);
// runCallbackBeforeEvent.forAllEvents(15, hey);
//
// runCallbackBeforeEvent.byEventName('aaa', 20, anotherTestFunc);
// runCallbackBeforeEvent.byEventName('min', 17, anotherTestFunc);
//
// calendarEvents.createEvent('min', '07.05.2018', '17:07:00', ()=> {console.log('HEY');});
// calendarEvents.createEvent('aaa', '07.05.2018', '17:07:21', ()=> {console.log('I`m glad to see you!');});
//
// console.log(getEvents.perWeek(2));