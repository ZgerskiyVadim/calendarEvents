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

repeatEvent.everyDay('min', '10.05.2018', '13:13:20', testFunc, 3);

calendarEvents.createEvent('min', '10.05.2018', '13:15:30', hey, 1);
calendarEvents.createEvent('aaa', '10.05.2018', '13:15:40', anotherTestFunc, 2);
// setTimeout(() => {
//     calendarEvents.deleteEvent(1);
// }, 2000);
// setTimeout(() => {
//     calendarEvents.createEvent('min', '09.05.2018', '16:14:40', hey, 1);
// }, 3000);
// calendarEvents.createEvent('aaa', '08.05.2018', '18:56:50', testFunc, 2);
