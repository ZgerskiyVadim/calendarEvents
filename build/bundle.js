/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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


/***/ })

/******/ });