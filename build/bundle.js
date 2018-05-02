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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = __webpack_require__(2);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendar = function () {
    var events = [];
    var interval = void 0;
    var countdown = 0;
    var secondsLeft = 0;

    return {
        createEvent: function createEvent(eventName, date, time, callback) {
            var timeToFinish = _helper2.default.getTimeInSeconds(date, time);
            var newDate = _helper2.default.newDate(date, time);
            var newEvent = {
                eventName: eventName,
                timeToFinish: timeToFinish,
                newDate: newDate,
                callback: callback
            };
            events.push(newEvent);
            this.startAndRefreshTimer();
        },
        changeEvent: function changeEvent(eventName, date, time, callback) {
            var _this = this;

            events.forEach(function (elem) {
                if (elem.callback === callback) {
                    var timeToFinish = _helper2.default.getTimeInSeconds(date, time);
                    _this.setEventsByTime = secondsLeft;
                    elem.eventName = eventName;
                    elem.timeToFinish = timeToFinish;
                    _this.startAndRefreshTimer();
                }
            });
        },
        deleteEvent: function deleteEvent(eventName) {
            var _this2 = this;

            events.forEach(function (elem, index) {
                if (elem.eventName === eventName) {
                    events.splice(index, 1);
                    _this2.startAndRefreshTimer();
                }
            });
        },
        startAndRefreshTimer: function startAndRefreshTimer() {
            var _this3 = this;

            clearInterval(interval);
            var minEvent = events.length ? _helper2.default.minValueOfTime(events) : {};

            if (minEvent.timeToFinish > 0) {
                countdown = minEvent.timeToFinish;
                interval = setInterval(function () {
                    countdown = countdown - 1;
                    secondsLeft = secondsLeft + 1;
                    if (countdown <= 0) {
                        secondsLeft = 0;
                        minEvent.callback();
                        clearInterval(interval);
                        _this3.setEventsByTime = minEvent.timeToFinish;
                        _this3.deleteEvent(minEvent.eventName);
                    }
                }, 1000);
            } else if (minEvent.callback) {
                minEvent.callback();
                this.deleteEvent(minEvent.eventName);
            }
        },


        get getEvents() {
            return events;
        },

        set setEventsByTime(minTime) {
            events.forEach(function (event) {
                return event.timeToFinish = event.timeToFinish - minTime;
            });
        }
    };
}();

var testFunc = function testFunc() {
    console.log('TEST FUNc');
};

var testFunc1 = function testFunc1() {
    console.log('TEST FUNc11111111111');
};

// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);
calendar.createEvent('1', '02.05.2018', '16:54:40', testFunc1);
calendar.createEvent('2', '02.05.2018', '16:54:50', testFunc);

setTimeout(function () {
    calendar.changeEvent('1', '02.05.2018', '14:35:30', testFunc1);
}, 3000);

// calendar.createEvent('3', '28.04.2018', '15:46:50', testFunc1);
// calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('eventName');
exports.default = calendar;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _getEventsForPeriod = __webpack_require__(3);

var _getEventsForPeriod2 = _interopRequireDefault(_getEventsForPeriod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    return {
        getTimeInSeconds: function getTimeInSeconds(date, time) {
            var nowDate = new Date().getTime();
            var chosenDate = this.newDate(date, time).getTime();
            return parseInt((chosenDate - nowDate) / 1000);
        },
        newDate: function newDate(date, time) {
            var parsedDate = this.parseDate(date);
            var parsedTime = this.parseTime(time);
            return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
        },
        minValueOfTime: function minValueOfTime(array) {
            return array.reduce(function (prev, curr) {
                return prev.timeToFinish < curr.timeToFinish ? prev : curr;
            });
        },
        parseDate: function parseDate(date) {
            var arrayDate = date.split('.');
            var day = arrayDate[0];
            var month = arrayDate[1] - 1;
            var year = arrayDate[2];

            return {
                day: day,
                month: month,
                year: year
            };
        },
        parseTime: function parseTime(time) {
            var arrayTime = time ? time.split(':') : [];
            var hour = arrayTime[0] || 0;
            var minute = arrayTime[1] || 0;
            var second = arrayTime[2] || 0;

            return {
                hour: hour,
                minute: minute,
                second: second
            };
        }
    };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _helper = __webpack_require__(2);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEvents = function () {
    return {
        perDay: function perDay(dayNumber) {
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getDay() === dayNumber;
            });
        },
        perWeek: function perWeek(weekNumber) {
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return parseInt(event.newDate.getDate() / 7) === weekNumber - 1;
            });
        },
        perMonth: function perMonth(monthNumber) {
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getMonth() === monthNumber - 1;
            });
        },
        perPeriod: function perPeriod(startPeriod, finishPeriod) {
            startPeriod = _helper2.default.newDate(startPeriod).getTime();
            finishPeriod = _helper2.default.newDate(finishPeriod).getTime();
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod;
            });
        }
    };
}();

// console.log('getEvents.perDay(3)', getEvents.perDay(3));
// console.log('getEvents.perMonth(5)', getEvents.perMonth(5));
// console.log('getEvents.perWeek(1)', getEvents.perWeek(1));
// console.log('getEvents.perPeriod', getEvents.perPeriod('02.05.2018', '03.05.2018'));

/***/ })
/******/ ]);