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

// calendarEvents.createEvent('min', '08.05.2018', '18:56:40', hey, 1);
// calendarEvents.createEvent('aaa', '08.05.2018', '18:56:50', testFunc, 2);
