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

var _constants = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarEvents = function () {
    var observer = new _observer2.default();
    var events = [];
    var interval = void 0;
    var countdown = 0;
    var secondsLeft = 0;

    function startTimer(newEvent) {
        if (newEvent.timeToFinish > 0) {
            calendarEvents.subscribe(newEvent.eventName, newEvent.callback);
            startAndRefreshTimer();
        } else {
            console.error('Please enter valid date');
            deleteEventByName(newEvent.eventName);
        }
    }

    function startAndRefreshTimer() {
        clearInterval(interval);
        var closestEvent = events.length ? _helper2.default.minValueOfTime(events) : {};

        if (closestEvent.timeToFinish) {
            closestEvent.isActive = true;
            triggerSetInterval(closestEvent);
        }
    }

    function triggerSetInterval(closestEvent) {
        countdown = closestEvent.timeToFinish;

        interval = setInterval(function () {
            countdown = countdown - 1;
            secondsLeft = secondsLeft + 1;
            calendarEvents.trigger(_constants.COUNTDOWN);

            if (countdown <= 0) {
                secondsLeft = 0;
                clearInterval(interval);
                closestEvent.callback();
                setEventsByTime(closestEvent.timeToFinish);
                calendarEvents.unsubscribeFunc(closestEvent.callback);
                deleteEventByName(closestEvent.eventName);

                calendarEvents.trigger(closestEvent.eventName);
                startAndRefreshTimer();
            }
            console.log('countdown', countdown);
        }, 1000);
    }

    function setEventsByTime(secondsLeft) {
        events.forEach(function (event) {
            return event.timeToFinish = event.timeToFinish - secondsLeft;
        });
    }

    function deleteEventByName(eventName) {
        events.forEach(function (event, index) {
            return event.eventName === eventName && events.splice(index, 1);
        });
    }

    return {
        createEvent: function createEvent(eventName, date, time, callback) {
            var newDate = _helper2.default.newDate(date, time);
            var timeToFinish = _helper2.default.calculateDateDifference(newDate);
            var newEvent = {
                eventName: eventName,
                timeToFinish: timeToFinish,
                newDate: newDate,
                callback: callback
            };

            events.push(newEvent);
            startTimer(newEvent);
        },
        changeEvent: function changeEvent(eventName, date, time, callback) {
            var _this = this;

            events.forEach(function (event) {
                if (event.callback === callback) {
                    var newDate = _helper2.default.newDate(date, time);
                    var timeToFinish = _helper2.default.calculateDateDifference(newDate);
                    setEventsByTime(secondsLeft);
                    _this.subscriberUpdateKey(event.eventName, eventName);
                    _this.unsubscribeFunc(event.callback);
                    event.isActive = false;
                    event = Object.assign(event, { eventName: eventName, timeToFinish: timeToFinish, newDate: newDate });
                    startTimer(event);
                }
            });
        },
        deleteEvent: function deleteEvent(eventName) {
            var _this2 = this;

            events.forEach(function (event, index) {
                if (event.eventName === eventName) {
                    _this2.unsubscribe(event.eventName);
                    events.splice(index, 1);
                    setEventsByTime(secondsLeft);
                    startAndRefreshTimer();
                }
            });
        },


        get getEvents() {
            return events;
        },

        get getCountDown() {
            return countdown;
        },

        subscribe: function subscribe(eventName, func) {
            observer.subscribe(eventName, func);
        },
        unsubscribe: function unsubscribe(key) {
            observer.unsubscribe(key);
        },
        unsubscribeFunc: function unsubscribeFunc(func) {
            observer.unsubscribeFunc(func);
        },
        subscriberUpdateKey: function subscriberUpdateKey(currentKey, newKey) {
            observer.updateKey(currentKey, newKey);
        },
        trigger: function trigger(eventName) {
            observer.trigger(eventName);
        }
    };
}();

exports.default = calendarEvents;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    return {
        calculateDateDifference: function calculateDateDifference(newDate) {
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

var _runCallbackBeforeEvent = __webpack_require__(6);

var _runCallbackBeforeEvent2 = _interopRequireDefault(_runCallbackBeforeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anotherTestFunc = function anotherTestFunc() {
    console.log('Another test function');
};

var testFunc = function testFunc() {
    console.log('Test function');
};

function hey() {
    console.log('HELLO');
}

// runCallbackBeforeEvent.forAllEvents(5, testFunc);
// runCallbackBeforeEvent.forAllEvents(15, hey);
//
// runCallbackBeforeEvent.byEventName('aaa', 20, anotherTestFunc);
// runCallbackBeforeEvent.byEventName('min', 17, anotherTestFunc);
//
// calendarEvents.createEvent('min', '07.05.2018', '17:07:00', ()=> {console.log('HEY');});
// calendarEvents.createEvent('aaa', '07.05.2018', '17:07:21', ()=> {console.log('I`m glad to see you!');});
//
// console.log(getEvents.perWeek(2));

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
            var keyIsExist = this.observers.map(function (subscriber) {
                return subscriber.key;
            }).includes(key);

            if (keyIsExist) {
                this.observers.forEach(function (subscriber) {
                    return subscriber.key === key && subscriber.funcs.push(func);
                });
            } else {
                this.observers.push({ key: key, funcs: [func] });
            }
        }
    }, {
        key: "updateKey",
        value: function updateKey(currentKey, newKey) {
            this.observers.forEach(function (subscriber) {
                return subscriber.key === currentKey && (subscriber.key = newKey);
            });
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(key) {
            this.observers = this.observers.filter(function (subscriber) {
                return subscriber.key !== key;
            });
        }
    }, {
        key: "unsubscribeFunc",
        value: function unsubscribeFunc(func) {
            var _this = this;

            this.observers.forEach(function (subscriber) {
                subscriber.funcs.forEach(function (f, index) {
                    f === func && subscriber.funcs.splice(index, 1);
                    !subscriber.funcs.length && _this.unsubscribe(subscriber.key);
                });
            });
        }
    }, {
        key: "trigger",
        value: function trigger(key) {
            this.observers.forEach(function (subscriber) {
                return subscriber.key === key && subscriber.funcs.forEach(function (f) {
                    return f();
                });
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

exports.default = function () {
    return {
        perDay: function perDay(dayNumber) {
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getDay() === dayNumber;
            });
        },
        perWeek: function perWeek(weekNumber) {
            return _calendarEvents2.default.getEvents.filter(function (event) {
                var year = event.newDate.getFullYear();
                var month = event.newDate.getMonth();
                var firstWeekDayOfMonth = new Date(year, month).getDay() || 7;
                var numberOfDayOfMonth = event.newDate.getDate();

                return 8 - firstWeekDayOfMonth + 7 * (weekNumber - 1) >= numberOfDayOfMonth && numberOfDayOfMonth > 8 - firstWeekDayOfMonth + 7 * (weekNumber - 2);
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

exports.default = function () {
    var numberOfMonthInYear = 12;
    var daysInWeek = 7;

    function countOfDaysToClosetsDayOfWeek(selectedDays) {
        var currentDayOfWeek = new Date().getDay();

        return selectedDays.map(function (selectedDay) {
            return selectedDay - currentDayOfWeek < 0 ? daysInWeek - (currentDayOfWeek - selectedDay) : selectedDay - currentDayOfWeek ? selectedDay - currentDayOfWeek : daysInWeek;
        }).reduce(function (prev, curr) {
            return prev < curr ? prev : curr;
        });
    }

    function getDateOfNewDay(addDaysBeforeTriggerEvent) {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var daysInCurrentMonth = new Date(year, month, 0).getDate();
        var day = new Date().getDate();

        day = day + addDaysBeforeTriggerEvent;

        if (day > daysInCurrentMonth) {
            day = day - daysInCurrentMonth;
            month = month + 1;
        }
        if (month > numberOfMonthInYear) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': day + '.' + month + '.' + year,
            'time': new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        };
    }

    return {
        everyDay: function everyDay(eventName, date, time, callback) {
            _calendarEvents2.default.createEvent(eventName, date, time, callback);

            _calendarEvents2.default.subscribe(eventName, function () {
                var dateOfNewDay = getDateOfNewDay(1);
                _calendarEvents2.default.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback);
            });
        },
        everySelectedDay: function everySelectedDay(eventName, date, time, callback) {
            for (var _len = arguments.length, selectedDays = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
                selectedDays[_key - 4] = arguments[_key];
            }

            _calendarEvents2.default.createEvent(eventName, date, time, callback);

            _calendarEvents2.default.subscribe(eventName, function () {
                var countOfDays = countOfDaysToClosetsDayOfWeek(selectedDays);
                var dateOfNewDay = getDateOfNewDay(countOfDays);
                _calendarEvents2.default.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback);
            });
        }
    };
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _calendarEvents = __webpack_require__(0);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _constants = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    return {
        forAllEvents: function forAllEvents(secondsBeforeCallEvent, callback) {
            _calendarEvents2.default.subscribe(_constants.COUNTDOWN, function () {
                if (_calendarEvents2.default.getCountDown === secondsBeforeCallEvent) {
                    callback();
                }
            });
        },
        byEventName: function byEventName(eventName, secondsBeforeCallEvent, callback) {
            _calendarEvents2.default.subscribe(_constants.COUNTDOWN, function () {
                var activeEvent = _calendarEvents2.default.getEvents.filter(function (event) {
                    return event.isActive;
                });
                if (_calendarEvents2.default.getCountDown === secondsBeforeCallEvent && eventName === activeEvent[0].eventName) {
                    callback();
                }
            });
        }
    };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COUNTDOWN = exports.COUNTDOWN = 'countdown';

/***/ })
/******/ ]);