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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COUNTDOWN = exports.COUNTDOWN = 'countdown';
var SHOW_EVENTS_IN_HTML = exports.SHOW_EVENTS_IN_HTML = 'showEventsInHtml';
var daysInWeek = exports.daysInWeek = 7;
var sunday = exports.sunday = 7;
var numberOfMonthInYear = exports.numberOfMonthInYear = 12;
var miliseconds = exports.miliseconds = 1000;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _throwError = __webpack_require__(2);

var _throwError2 = _interopRequireDefault(_throwError);

var _constants = __webpack_require__(0);

var _helper = __webpack_require__(3);

var _helper2 = _interopRequireDefault(_helper);

var _observer = __webpack_require__(5);

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarEvents = function () {
    var observer = new _observer2.default();
    var events = [];
    var interval = void 0;
    var countdown = 0;
    var secondsLeft = 0;

    function startTimer(newEvent) {
        if (newEvent.timeToFinish > 0) {
            calendarEvents.subscribe(newEvent.id, newEvent.callback);
            startAndRefreshTimer();
        } else {
            (0, _throwError2.default)('You can`t enter past date');
            events.forEach(function (event, index) {
                return event.id === newEvent.id && events.splice(index, 1);
            });
        }
    }

    function startAndRefreshTimer() {
        setTimeout(function () {
            calendarEvents.trigger(_constants.SHOW_EVENTS_IN_HTML);
        }, 40);
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
                closestEvent.isFinished = true;
                closestEvent.callback();
                setEventsByTime(closestEvent.timeToFinish);
                calendarEvents.unsubscribeFunc(closestEvent.callback);

                calendarEvents.trigger(closestEvent.id);
                startAndRefreshTimer();
            }
            console.log('countdown', countdown);
        }, 1000);
    }

    function setEventsByTime(secondsLeft) {
        events.forEach(function (event) {
            return !event.isFinished && (event.timeToFinish = event.timeToFinish - secondsLeft);
        });
    }

    return {
        createEvent: function createEvent(eventName, date, time, callback, id) {
            var newDate = _helper2.default.newDate(date, time);
            if (!_helper2.default.dataIsValid(eventName, newDate, callback)) return;
            var timeToFinish = _helper2.default.calculateDateDifference(newDate);
            var newEvent = {
                eventName: eventName,
                id: id || _helper2.default.generateId(),
                timeToFinish: timeToFinish,
                newDate: newDate,
                callback: callback
            };

            events.push(newEvent);
            startTimer(newEvent);
        },
        changeEvent: function changeEvent(id, eventName, date, time) {
            var _this = this;

            events.forEach(function (event) {
                if (event.id === id && !event.isFinished) {
                    var newDate = _helper2.default.newDate(date, time);
                    if (!_helper2.default.dataIsValid(eventName, newDate)) return;
                    var timeToFinish = _helper2.default.calculateDateDifference(newDate);
                    setEventsByTime(secondsLeft);
                    _this.unsubscribeFunc(event.callback);
                    event.isActive = false;
                    event = Object.assign(event, { eventName: eventName, timeToFinish: timeToFinish, newDate: newDate });
                    startTimer(event);
                }
            });
        },
        deleteEvent: function deleteEvent(id) {
            var _this2 = this;

            events.forEach(function (event, index) {
                if (event.id === id && !event.isFinished) {
                    _this2.unsubscribe(event.id);
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

        subscribe: function subscribe(key, func) {
            observer.subscribe(key, func);
        },
        unsubscribe: function unsubscribe(key) {
            observer.unsubscribe(key);
        },
        unsubscribeFunc: function unsubscribeFunc(func) {
            observer.unsubscribeFunc(func);
        },
        trigger: function trigger(key) {
            observer.trigger(key);
        }
    };
}();

exports.default = calendarEvents;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    console.error(message);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _throwError = __webpack_require__(2);

var _throwError2 = _interopRequireDefault(_throwError);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    return {
        calculateDateDifference: function calculateDateDifference(newDate) {
            var nowDate = new Date().getTime();
            var chosenDate = newDate.getTime();
            return parseInt((chosenDate - nowDate) / _constants.miliseconds);
        },
        newDate: function newDate(date, time) {
            var parsedDate = this.parseDate(date);
            var parsedTime = this.parseTime(time);
            if (!parsedDate || !parsedTime) return;
            return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
        },
        minValueOfTime: function minValueOfTime(array) {
            var notFinished = array.filter(function (elem) {
                return !elem.isFinished;
            });
            return notFinished.length && notFinished.reduce(function (prev, curr) {
                return prev.timeToFinish < curr.timeToFinish ? prev : curr;
            });
        },
        parseDate: function parseDate(date) {
            var arrayDate = date ? date.split('.') : [];
            if (this.dateIsNotValid(arrayDate)) return;
            var day = arrayDate[0];
            var month = arrayDate[1] - 1;
            var year = arrayDate[2];
            if (day.length > 2 || month.length > 2 || year.length !== 4) return;

            return {
                day: day,
                month: month,
                year: year
            };
        },
        parseTime: function parseTime(time) {
            var arrayTime = time ? time.split(':') : [];
            if (time && this.dateIsNotValid(arrayTime)) return;
            var hour = arrayTime[0] || 0;
            var minute = arrayTime[1] || 0;
            var second = arrayTime[2] || 0;

            return {
                hour: hour,
                minute: minute,
                second: second
            };
        },
        generateId: function generateId() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(2);
        },
        dataIsValid: function dataIsValid(eventName, newDate, callback) {
            if (!this.isString(eventName)) {
                (0, _throwError2.default)('Event name must be a string');return false;
            }
            if (!newDate) {
                (0, _throwError2.default)('Please enter valid date or time');return false;
            }
            if (callback && !this.isFunction(callback)) {
                (0, _throwError2.default)('Please enter function');return false;
            }
            return true;
        },
        dateIsNotValid: function dateIsNotValid(arrayOfDate) {
            return !arrayOfDate.length || arrayOfDate.length !== 3;
        },
        selectedDaysIsValid: function selectedDaysIsValid(selectedDays) {
            var selectedDaysLength = selectedDays.length;
            for (var i = 0; i < selectedDaysLength; i++) {
                if (!this.isNumber(selectedDays[i])) {
                    (0, _throwError2.default)('Selected days must be a number');return false;
                }
            }
            return true;
        },
        isNumber: function isNumber(value) {
            if (value <= 0) return false;
            return Number.isInteger(value);
        },
        isString: function isString(value) {
            return typeof value === 'string';
        },
        isFunction: function isFunction(value) {
            return typeof value === 'function';
        }
    };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(1);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _getEventsForPeriod = __webpack_require__(7);

var _getEventsForPeriod2 = _interopRequireDefault(_getEventsForPeriod);

var _repeatEvent = __webpack_require__(8);

var _repeatEvent2 = _interopRequireDefault(_repeatEvent);

var _runCallbackBeforeEvent = __webpack_require__(9);

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

_repeatEvent2.default.everyDay('min', '09.05.2018', '16:31:30', hey, 1);
// setTimeout(() => {
//     calendarEvents.deleteEvent(1);
// }, 2000);
// setTimeout(() => {
//     calendarEvents.createEvent('min', '09.05.2018', '16:14:40', hey, 1);
// }, 3000);
// calendarEvents.createEvent('aaa', '08.05.2018', '18:56:50', testFunc, 2);

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendarEvents = __webpack_require__(1);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
    var eventsContainer = document.querySelector('.events');
    var event = eventsContainer.querySelector('.event');
    _calendarEvents2.default.subscribe(_constants.SHOW_EVENTS_IN_HTML, showEvents);

    function showEvents() {
        var eventsItems = _calendarEvents2.default.getEvents.map(function (event) {
            event.time = event.newDate.getHours() + ':' + event.newDate.getMinutes() + ':' + event.newDate.getSeconds();
            event.date = event.newDate.getDate() + '.' + (event.newDate.getMonth() + 1) + '.' + event.newDate.getFullYear();
            return event;
        });
        event.style.display = 'flex';

        eventsContainer.innerHTML = '<h1>Events:</h1>' + '<h2 class="event">' + '<div>id: <span class="id"></span></div>' + '<div>name: <span class="name"></span></div>' + '<div>date: <span class="date"></span></div>' + '<div>time: <span class="time"></span></div>' + '</h2>';

        addItems(eventsItems);
        changeBgColor(eventsItems);
    }

    // Show countdown in html
    _calendarEvents2.default.subscribe(_constants.COUNTDOWN, function () {
        var countdown = document.querySelector('.countdown');
        countdown.innerHTML = _calendarEvents2.default.getCountDown;
    });

    // Change background for finished events
    function changeBgColor(eventsItems) {
        var eventsNotFinished = eventsItems.filter(function (event) {
            return event.isFinished;
        });
        var ids = document.querySelectorAll('.id');

        eventsNotFinished.forEach(function (event) {
            ids.forEach(function (id) {
                if (event.id.toString() === id.textContent.toString()) {
                    var parentContainer = id.parentElement.parentElement;
                    parentContainer.style.backgroundColor = 'rgba(0, 204, 0, 0.69)';
                }
            });
        });
    }

    function addItems(items) {
        var item = event.cloneNode(true);
        event.style.display = 'none';

        for (var i = 0; i < items.length; i++) {
            var innerOfItem = elementsInContent(item);
            innerOfItem.id.innerHTML = items[i].id;
            innerOfItem.name.innerHTML = items[i].eventName;
            innerOfItem.date.innerHTML = items[i].date;
            innerOfItem.time.innerHTML = items[i].time;
            eventsContainer.appendChild(item);
            item = item.cloneNode(true);
        }
    }

    function elementsInContent(item) {
        var id = item.querySelector('.id');
        var name = item.querySelector('.name');
        var date = item.querySelector('.date');
        var time = item.querySelector('.time');
        return { id: id, name: name, date: date, time: time };
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _throwError = __webpack_require__(2);

var _throwError2 = _interopRequireDefault(_throwError);

var _constants = __webpack_require__(0);

var _calendarEvents = __webpack_require__(1);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _helper = __webpack_require__(3);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    function lastDayOfWeek(numberOfWeek) {
        var year = event.newDate.getFullYear();
        var month = event.newDate.getMonth();
        var firstWeekDayOfMonth = new Date(year, month).getDay() || _constants.sunday;

        return _constants.daysInWeek - firstWeekDayOfMonth + 1 + _constants.daysInWeek * numberOfWeek;
    }

    return {
        perDay: function perDay(dayNumber) {
            if (!_helper2.default.isNumber(dayNumber)) return (0, _throwError2.default)('Please enter number of day when 1 - monday and 7 - sunday');
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return (event.newDate.getDay() || _constants.sunday) === dayNumber;
            });
        },
        perWeek: function perWeek(weekNumber) {
            if (!_helper2.default.isNumber(weekNumber)) return (0, _throwError2.default)('Please enter number of week when 1 - first week');
            var chosenWeek = weekNumber - 1;
            var lastWeek = chosenWeek - 1;
            return _calendarEvents2.default.getEvents.filter(function (event) {
                var dayOfMonth = event.newDate.getDate();
                return lastDayOfWeek(chosenWeek) >= dayOfMonth && dayOfMonth > lastDayOfWeek(lastWeek);
            });
        },
        perMonth: function perMonth(monthNumber) {
            if (!_helper2.default.isNumber(monthNumber)) return (0, _throwError2.default)('Please enter number of month when 1 - january and 12 - december');
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getMonth() === monthNumber - 1;
            });
        },
        perPeriod: function perPeriod(startPeriod, finishPeriod) {
            startPeriod = _helper2.default.newDate(startPeriod) && _helper2.default.newDate(startPeriod).getTime();
            finishPeriod = _helper2.default.newDate(finishPeriod) && _helper2.default.newDate(finishPeriod).getTime();
            if (!startPeriod || !finishPeriod) return (0, _throwError2.default)('Please enter valid date');
            return _calendarEvents2.default.getEvents.filter(function (event) {
                return event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod;
            });
        }
    };
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(0);

var _calendarEvents = __webpack_require__(1);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

var _helper = __webpack_require__(3);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    function calculateCountDaysBeforeSelectedDay(selectedDays) {
        var currentDayOfWeek = new Date().getDay();

        return selectedDays.map(function (selectedDay) {
            return selectedDay - currentDayOfWeek < 0 ? _constants.daysInWeek - (currentDayOfWeek - selectedDay) : selectedDay - currentDayOfWeek ? selectedDay - currentDayOfWeek : _constants.daysInWeek;
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

        // if (day >  daysInCurrentMonth) {
        //     day = day - daysInCurrentMonth;
        //     month = month + 1;
        // }
        // if (month > numberOfMonthInYear) {
        //     month = 1;
        //     year = year + 1;
        // }

        return {
            'date': day + '.' + month + '.' + year,
            'time': new Date().getHours() + ':' + new Date().getMinutes() + ':' + (new Date().getSeconds() + 4)
        };
    }

    return {
        everyDay: function everyDay(eventName, date, time, callback, id) {
            id = id || _helper2.default.generateId();
            _calendarEvents2.default.createEvent(eventName, date, time, callback, id);

            _calendarEvents2.default.subscribe(id, function () {
                var dateOfNewDay = getDateOfNewDay(0);
                _calendarEvents2.default.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback, id);
            });
        },
        everySelectedDay: function everySelectedDay(eventName, date, time, callback, id) {
            for (var _len = arguments.length, selectedDays = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
                selectedDays[_key - 5] = arguments[_key];
            }

            id = id || _helper2.default.generateId();
            if (!_helper2.default.selectedDaysIsValid(selectedDays)) return;
            _calendarEvents2.default.createEvent(eventName, date, time, callback, id);

            _calendarEvents2.default.subscribe(id, function () {
                var countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
                var dateOfNewDay = getDateOfNewDay(countOfDays);
                _calendarEvents2.default.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback, id);
            });
        }
    };
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(0);

var _calendarEvents = __webpack_require__(1);

var _calendarEvents2 = _interopRequireDefault(_calendarEvents);

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
        byEventId: function byEventId(id, secondsBeforeCallEvent, callback) {
            _calendarEvents2.default.subscribe(_constants.COUNTDOWN, function () {
                var activeEvent = _calendarEvents2.default.getEvents.filter(function (event) {
                    return event.isActive;
                });
                if (_calendarEvents2.default.getCountDown === secondsBeforeCallEvent && id === activeEvent[0].id) {
                    callback();
                }
            });
        }
    };
}();

/***/ })
/******/ ]);