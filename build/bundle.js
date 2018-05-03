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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = __webpack_require__(1);

var _helper2 = _interopRequireDefault(_helper);

var _observer = __webpack_require__(3);

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var observer = new _observer2.default();

var calendar = function () {
    var events = [];
    var interval = void 0;
    var countdown = 0;
    var secondsLeft = 0;

    return {
        createEvent: function createEvent(eventName, date, time, callback) {
            var newDate = _helper2.default.newDate(date, time);
            var timeToFinish = _helper2.default.getTimeInSeconds(newDate);
            var newEvent = {
                eventName: eventName,
                timeToFinish: timeToFinish,
                newDate: newDate,
                callback: callback
            };
            events.push(newEvent);
            this.subscribe(eventName, callback);
            this.startAndRefreshTimer();
        },
        changeEvent: function changeEvent(eventName, date, time, callback) {
            var _this = this;

            events.forEach(function (event) {
                if (event.callback === callback) {
                    var newDate = _helper2.default.newDate(date, time);
                    var timeToFinish = _helper2.default.getTimeInSeconds(newDate);
                    _this.setEventsByTime = secondsLeft;

                    observer.unsubscribe(event.callback);
                    console.table(event);
                    event = Object.assign(event, { eventName: eventName, timeToFinish: timeToFinish, newDate: newDate });
                    console.table(event);
                    _this.subscribe(event.eventName, callback);
                    _this.startAndRefreshTimer();
                }
            });
        },
        deleteEvent: function deleteEvent(eventName) {
            var _this2 = this;

            events.forEach(function (event, index) {
                if (event.eventName === eventName) {
                    observer.unsubscribe(event.callback);
                    events.splice(index, 1);
                    _this2.startAndRefreshTimer();
                }
            });
        },
        unsubscribeAllEvents: function unsubscribeAllEvents(eventName) {
            observer.unsubscribeByKey(eventName);
        },
        startAndRefreshTimer: function startAndRefreshTimer() {
            clearInterval(interval);
            var eventWithMinTime = events.length ? _helper2.default.minValueOfTime(events) : {};

            if (eventWithMinTime.timeToFinish > 0) {
                this.triggerSetInterval(eventWithMinTime);
            } else if (eventWithMinTime.timeToFinish <= 0) {
                console.error('Please enter valid date');
                this.deleteEvent(eventWithMinTime.eventName);
                // observer.trigger(eventWithMinTime.eventName);
            }
        },
        triggerSetInterval: function triggerSetInterval(eventWithMinTime) {
            var _this3 = this;

            countdown = eventWithMinTime.timeToFinish;
            interval = setInterval(function () {
                countdown = countdown - 1;
                secondsLeft = secondsLeft + 1;
                if (countdown <= 0) {
                    secondsLeft = 0;
                    clearInterval(interval);
                    _this3.setEventsByTime = eventWithMinTime.timeToFinish;
                    observer.trigger(eventWithMinTime.eventName);
                    _this3.deleteEvent(eventWithMinTime.eventName);
                }
                console.log('countdown', countdown);
            }, 1000);
        },
        callCallbackBeforeEvent: function callCallbackBeforeEvent(seconds, callback) {
            setInterval(function () {
                if (countdown === seconds) {
                    callback();
                }
            });
        },
        subscribe: function subscribe(eventName, callback) {
            observer.subscribe(eventName, callback);
        },
        trigger: function trigger(eventName) {
            observer.trigger(eventName);
        },


        get getEvents() {
            return events;
        },

        set setEventsByTime(secondsLeft) {
            events.forEach(function (event) {
                return event.timeToFinish = event.timeToFinish - secondsLeft;
            });
        }
    };
}();

exports.default = calendar;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    return {
        getTimeInSeconds: function getTimeInSeconds(newDate) {
            var nowDate = new Date().getTime();
            var chosenDate = newDate.getTime();
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _getEventsForPeriod = __webpack_require__(4);

var _getEventsForPeriod2 = _interopRequireDefault(_getEventsForPeriod);

var _repeatEvent = __webpack_require__(5);

var _repeatEvent2 = _interopRequireDefault(_repeatEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testFunc = function testFunc() {
    console.log('TEST FUNc');
};

var testFunc1 = function testFunc1() {
    console.log('TEST FUNc11111111111');
};

function ky() {
    console.log('KY');
}

// calendar.createEvent('min', '28.04.2018', '15:16:00', testFunc);
_calendarEvents2.default.createEvent('1', '03.05.2018', '18:48:30', testFunc1);
_calendarEvents2.default.createEvent('2', '03.05.2018', '18:48:20', testFunc);

// setTimeout(() => {
//     calendar.changeEvent('1', '02.05.2018', '17:24:30', testFunc1);
//     calendar.deleteEvent('1');
// }, 3000);


// calendar.createEvent('3', '03.05.2018', '15:29:23', testFunc1);

// repeatEvent.everyDay('kek', '03.05.2018', '18:37:30', ky);
//
//
// setTimeout(() => {
//     calendar.changeEvent('lol', '03.05.2018', '18:37:20', ky);
// }, 1000);


// setTimeout(() => {
//     console.log('DELETE');
//     calendar.deleteEvent('kek');
// }, 10000);


// calendar.createEvent('2', '03.05.2018', '15:29:25', testFunc);
_calendarEvents2.default.callCallbackBeforeEvent(4, function () {
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
    function Observable() {
        _classCallCheck(this, Observable);

        this.observers = [];
    }

    _createClass(Observable, [{
        key: "subscribe",
        value: function subscribe(key, func) {
            this.observers.push({ key: key, func: func });
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(func) {
            this.observers = this.observers.filter(function (subscriber) {
                return subscriber.func !== func;
            });
            console.table(this.observers);
        }
    }, {
        key: "unsubscribeByKey",
        value: function unsubscribeByKey(key) {
            this.observers = this.observers.filter(function (subscriber) {
                return subscriber.key !== key;
            });
        }
    }, {
        key: "trigger",
        value: function trigger(key) {
            this.observers.forEach(function (subscriber) {
                subscriber.key === key ? subscriber.func() : undefined;
            });
        }
    }]);

    return Observable;
}();

exports.default = Observable;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _helper = __webpack_require__(1);

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

exports.default = getEvents;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repeatEvent = function () {
    var secondsInDay = 86400 * 1000;
    return {
        everyDay: function everyDay(eventName, date, time, callback) {
            _calendarEvents2.default.subscribe(eventName, function () {
                setTimeout(function () {
                    callback();
                    _calendarEvents2.default.trigger(eventName);
                }, 2000);
            });
            _calendarEvents2.default.createEvent(eventName, date, time, callback);
        },
        everySelectedDay: function everySelectedDay(eventName, date, time, callback) {
            for (var _len = arguments.length, selectedDays = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                selectedDays[_key - 4] = arguments[_key];
            }

            var _this = this;

            var timeToFinish = this.getTimeInSecondsToClosestSelectedDay(selectedDays);
            _calendarEvents2.default.subscribe(eventName, function () {
                _this.timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
            });
            _calendarEvents2.default.createEvent(eventName, date, time, callback);
        },
        timeoutForEveryDay: function timeoutForEveryDay(callback) {
            var _this2 = this;

            setTimeout(function () {
                callback();
                _this2.timeoutForEveryDay(callback);
            }, secondsInDay);
        },
        timeoutForEverySelectedDay: function timeoutForEverySelectedDay(selectedDays, timeToFinish, callback) {
            var _this3 = this;

            setTimeout(function () {
                callback();
                timeToFinish = _this3.getTimeInSecondsToClosestSelectedDay(selectedDays);
                _this3.timeoutForEverySelectedDay(selectedDays, timeToFinish, callback);
            }, timeToFinish);
        },
        getTimeInSecondsToClosestSelectedDay: function getTimeInSecondsToClosestSelectedDay(selectedDays) {
            selectedDays = selectedDays.map(function (day) {
                return day === 0 ? day + 7 : day;
            });
            var daysBeforeSelectedDay = getDaysToClosestSelectedDay(selectedDays);
            return secondsInDay * daysBeforeSelectedDay;
        }
    };
}();

function getDaysToClosestSelectedDay(selectedDays) {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    var currentWeekDay = new Date().getDay();
    var currentMonthDay = new Date().getDate();

    var closestDayOfMonth = selectedDays.map(function (selectedWeekDay) {
        var dayInMonth = selectedWeekDay - currentWeekDay + currentMonthDay;
        if (dayInMonth - currentMonthDay <= 0) {
            return dayInMonth + 7 <= daysInCurrentMonth ? dayInMonth + 7 : dayInMonth + 7 - daysInCurrentMonth;
        } else {
            return dayInMonth > daysInCurrentMonth ? dayInMonth - daysInCurrentMonth : dayInMonth;
        }
    }).reduce(function (prev, curr) {
        return prev < curr ? prev : curr;
    });

    return closestDayOfMonth - currentMonthDay;
}

exports.default = repeatEvent;

/***/ })
/******/ ]);