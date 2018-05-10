import calendarEvents from './modules/calendarEvents';
import showInHtml from './js/index';
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

repeatEvent.everyDay('min', '10.05.2018', '14:10:20', testFunc, 3);

calendarEvents.createEvent('min', '10.05.2018', '14:10:30', hey, 1);
calendarEvents.createEvent('aaa', '10.05.2018', '14:10:40', anotherTestFunc, 2);
