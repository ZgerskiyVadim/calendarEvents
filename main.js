import calendarEvents from './modules/calendarEvents';
import getEvents from './modules/getEventsForPeriod';
import repeatEvent from './modules/repeatEvent';
import runCallbackBeforeEvent from './modules/runCallbackBeforeEvent';


const testFunc = () => {
    console.log('TEST FUNc');
};

const testFunc1 = () => {
    console.log('TEST FUNc11111111111');
};

function ky() {
    console.log('KY');
}

// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);

// repeatEvent.everyDay('kek', '04.05.2018', '19:34:00', ky);

runCallbackBeforeEvent.forAllEvents(5, testFunc1);
runCallbackBeforeEvent.forAllEvents(15, ky);

runCallbackBeforeEvent.byEventName('aaa', 20, testFunc);
runCallbackBeforeEvent.byEventName('min', 17, testFunc);

calendarEvents.createEvent('min', '07.05.2018', '17:07:00', ()=> {console.log('ZDAROVA');});
calendarEvents.createEvent('aaa', '07.05.2018', '17:07:21', ()=> {console.log('KEK');});


// setTimeout(() => {
//     calendarEvents.deleteEvent('min');
// }, 4000);
// setTimeout(() => {
//     calendarEvents.changeEvent('1', '02.05.2018', '17:24:30', testFunc1);
//     calendarEvents.deleteEvent('1');
// }, 3000);


// calendarEvents.createEvent('3', '03.05.2018', '15:29:23', testFunc1);

// repeatEvent.everyDay('kek', '03.05.2018', '18:37:30', ky);
//
//
// setTimeout(() => {
//     calendarEvents.changeEvent('lol', '03.05.2018', '18:37:20', ky);
// }, 1000);



// setTimeout(() => {
//     console.log('DELETE');
//     calendarEvents.deleteEvent('kek');
// }, 10000);


// calendarEvents.createEvent('2', '03.05.2018', '15:29:25', testFunc);

// calendarEvents.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendarEvents.deleteEvent('eventName');

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