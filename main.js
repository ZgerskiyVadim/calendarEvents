// import helperModule from './modules/helper';
// import repeatModule from './modules/repeatEvent';
//
// const calendar = (function () {
//     const events = [];
//
//     return {
//         createEvent(eventName, date, time, callback) {
//             helperModule.parseDate(date);
//             helperModule.parseTime(time);
//             const timeToFinish = helperModule.getTimeToFinish;
//             const newEvent = {
//                 eventName,
//                 timeToFinish,
//                 callback,
//                 timer: function (){
//                     return helperModule.createTimer(this);
//                 }
//             };
//             // clearInterval(newEvent.timer());
//             // helperModule.createTimer(newEvent);
//             events.push(newEvent);
//         },
//
//         changeEvent(eventName, date, time, callback) {
//             events.forEach(elem => {
//                 console.log('changeEvent elem', elem);
//                 if(elem.callback === callback) {
//                     clearInterval(elem.timer);
//                     helperModule.parseDate(date);
//                     helperModule.parseTime(time);
//                     const timeToFinish = helperModule.getTimeToFinish;
//                     elem.eventName = eventName;
//                     elem.timeToFinish = timeToFinish;
//                     clearInterval(elem.timer);
//                     helperModule.createTimer(elem);
//                     console.log('changeEVe tnttn', elem);
//                 }
//             });
//         },
//
//         deleteEvent(eventName) {
//             events.forEach((elem, index) => {
//                 if(elem.eventName === eventName) {
//                     clearInterval(elem.timer);
//                     events.splice(index, 1);
//                 }
//             });
//         },
//
//         get eventsPerDay () {
//
//         },
//
//         get getEvents () {
//             return events;
//         }
//     };
// }());
//
// const testFunc = () => {
//     console.log('TEST FUNc');
// };
//
// const testFunc1 = () => {
//     console.log('TEST FUNc');
// };
// // helperModule.globalTimer();
//
// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);
// calendar.createEvent('1', '28.04.2018', '15:46:50', testFunc1);
// calendar.createEvent('2', '28.04.2018', '15:46:50', testFunc1);
// calendar.createEvent('3', '28.04.2018', '15:46:50', testFunc1);
// // calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// // calendar.deleteEvent('eventName');
//
// repeatModule.everySelectedDay('eventName', '28.04.2018', '12:11:00', testFunc, 1 ,2 ,3);
//
// export default calendar;