import calendar from './modules/calendarEvents';
import getEvents from './modules/getEventsForPeriod';
import repeatEvent from './modules/repeatEvent';


const testFunc = () => {
    console.log('TEST FUNc');
};

const testFunc1 = () => {
    console.log('TEST FUNc11111111111');
};


// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);
// calendar.createEvent('1', '02.05.2018', '17:24:10', testFunc1);
// calendar.createEvent('2', '02.05.2018', '17:24:20', testFunc);

// setTimeout(() => {
//     calendar.changeEvent('1', '02.05.2018', '17:24:30', testFunc1);
//     calendar.deleteEvent('1');
// }, 3000);



calendar.createEvent('3', '03.05.2018', '15:29:23', testFunc1);
calendar.createEvent('2', '03.05.2018', '15:29:25', testFunc);
calendar.callCallbackBeforeEvent(4, function () {
    console.log('CALLLBACK');
});

// calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('eventName');

// GET EVENT PER PERIOD ------------------------------------------------------------------

// console.log('getEvents.perDay(3)', getEvents.perDay(3));
// console.log('getEvents.perMonth(5)', getEvents.perMonth(5));
// console.log('getEvents.perWeek(1)', getEvents.perWeek(1));
// console.log('getEvents.perPeriod', getEvents.perPeriod('02.05.2018', '03.05.2018'));

// REPEAT EVENT------------------------------------------------------------------

// repeatEvent.everySelectedDay('hell', '03.05.2018', '12:55:00', function () {
//     console.log('REPEAT');
// }, 3, 6 , 8);

// repeatEvent.everyDay('KEk', '02.05.2018', '18:06:30', function () {
//     console.log('KY');
// });