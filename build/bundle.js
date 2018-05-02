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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = __webpack_require__(1);

var _helper2 = _interopRequireDefault(_helper);

var _observer = __webpack_require__(2);

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
            var timeToFinish = _helper2.default.getTimeInSeconds(date, time);
            var newDate = _helper2.default.newDate(date, time);
            var newEvent = {
                eventName: eventName,
                timeToFinish: timeToFinish,
                newDate: newDate,
                callback: callback
            };
            events.push(newEvent);
            observer.subscribe(eventName, callback);
            this.startAndRefreshTimer();
        },
        changeEvent: function changeEvent(eventName, date, time, callback) {
            var _this = this;

            events.forEach(function (event) {
                if (event.callback === callback) {
                    var timeToFinish = _helper2.default.getTimeInSeconds(date, time);
                    _this.setEventsByTime = secondsLeft;
                    event.eventName = eventName;
                    event.timeToFinish = timeToFinish;
                    observer.unsubscribe(event.callback);
                    observer.subscribe(event.eventName, callback);
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
        startAndRefreshTimer: function startAndRefreshTimer() {
            clearInterval(interval);
            var eventWithMinTime = events.length ? _helper2.default.minValueOfTime(events) : {};

            if (eventWithMinTime.timeToFinish > 0) {
                this.triggerSetInterval(eventWithMinTime);
            } else if (eventWithMinTime.callback) {
                // eventWithMinTime.callback();
                observer.trigger(eventWithMinTime.eventName);
                this.deleteEvent(eventWithMinTime.eventName);
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
                    // eventWithMinTime.callback();
                    observer.trigger(eventWithMinTime.eventName);
                    clearInterval(interval);
                    _this3.setEventsByTime = eventWithMinTime.timeToFinish;
                    _this3.deleteEvent(eventWithMinTime.eventName);
                }
                console.log('countdown', countdown);
            }, 1000);
        },
        subscribe: function subscribe(eventName, callback) {
            observer.subscribe(eventName, callback);
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
calendar.createEvent('1', '02.05.2018', '17:24:10', testFunc1);
calendar.createEvent('2', '02.05.2018', '17:24:20', testFunc);

setTimeout(function () {
    calendar.changeEvent('1', '02.05.2018', '17:24:30', testFunc1);
    calendar.deleteEvent('1');
}, 3000);

// calendar.createEvent('3', '28.04.2018', '15:46:50', testFunc1);
// calendar.changeEvent('eventName', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('eventName');
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _getEventsForPeriod = __webpack_require__(4);

var _getEventsForPeriod2 = _interopRequireDefault(_getEventsForPeriod);

var _repeatEvent = __webpack_require__(5);

var _repeatEvent2 = _interopRequireDefault(_repeatEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

// console.log('getEvents.perDay(3)', getEvents.perDay(3));
// console.log('getEvents.perMonth(5)', getEvents.perMonth(5));
// console.log('getEvents.perWeek(1)', getEvents.perWeek(1));
// console.log('getEvents.perPeriod', getEvents.perPeriod('02.05.2018', '03.05.2018'));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _observer = __webpack_require__(2);

var _observer2 = _interopRequireDefault(_observer);

var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _helper = __webpack_require__(1);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var observer = new _observer2.default();

var repeatEvent = function () {
    var secondsInDay = 86400 * 1000;
    return {
        everyDay: function everyDay(eventName, date, time, callback) {
            _calendarEvents2.default.subscribe(eventName, function () {
                setInterval(function () {
                    callback();
                }, secondsInDay);
            });
            _calendarEvents2.default.createEvent(eventName, date, time, callback);
        },
        everySelectedDay: function everySelectedDay(eventName, date, time, callback) {
            for (var _len = arguments.length, selectedDays = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                selectedDays[_key - 4] = arguments[_key];
            }

            var timeToFinish = this.getTimeInSeconds(selectedDays);
            // calendarEvents.subscribe(eventName, () => {
            //     const timeToFinish = this.getTimeInSeconds(selectedDays);
            //     setInterval(() => {
            //         callback();
            //     }, secondsInDay);
            // });
            // calendarEvents.createEvent(eventName, date, time, callback);
        },
        getTimeInSeconds: function getTimeInSeconds(selectedDays) {
            selectedDays = [4, 1];
            var currentYear = new Date().getFullYear();
            var currentMonth = new Date().getMonth() + 1;
            var daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
            var currentWeekDay = new Date().getDay();
            console.log('currentWeekDay', currentWeekDay);
            // const currentMonthDay = new Date().getDate();
            var currentMonthDay = 30;
            selectedDays = selectedDays.map(function (selectedWeekDay) {
                var dayInMonth = selectedWeekDay - currentWeekDay + currentMonthDay;

                if (dayInMonth <= currentMonthDay && dayInMonth + 7 <= daysInCurrentMonth) {
                    return dayInMonth + 7;
                } else if (dayInMonth >= daysInCurrentMonth) {
                    var monthDay = Math.abs(daysInCurrentMonth - dayInMonth) ? Math.abs(daysInCurrentMonth - dayInMonth) : daysInCurrentMonth;
                    return monthDay;
                } else {
                    return dayInMonth;
                }
            }).map(function (selectedMonthDay) {
                console.log('selectedMonthDay', selectedMonthDay);
            });

            console.log('selectedDays', selectedDays);
        }
    };
}();

repeatEvent.getTimeInSeconds();

// repeatEvent.everyDay('hell', '02.05.2018', '18:06:30', function () {
//     console.log('REPEAT');
// });

exports.default = repeatEvent;

/***/ })
/******/ ]);