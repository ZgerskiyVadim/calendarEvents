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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _helper = __webpack_require__(/*! ./modules/helper */ 1);\n\nvar _helper2 = _interopRequireDefault(_helper);\n\nvar _repeatEvent = __webpack_require__(/*! ./modules/repeatEvent */ 2);\n\nvar _repeatEvent2 = _interopRequireDefault(_repeatEvent);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar calendar = function () {\n    var events = [];\n\n    return {\n        createEvent: function createEvent(nameOfEvent, date, time, event) {\n            var timeToFinish = _helper2.default.parseData(date, time).timeToFinish;\n            var newEvent = {\n                nameOfEvent: nameOfEvent,\n                timeToFinish: timeToFinish,\n                event: event\n            };\n            _helper2.default.createTimer(newEvent);\n            events.push(newEvent);\n        },\n        changeEvent: function changeEvent(nameOfEvent, date, time, event) {\n            console.log('changeEventchangeEventchangeEvent');\n            events.forEach(function (elem) {\n                console.log('changeEvent elem', elem);\n                if (elem.event === event) {\n                    clearInterval(elem.timer);\n                    var timeToFinish = _helper2.default.parseData(date, time).timeToFinish;\n                    elem.nameOfEvent = nameOfEvent;\n                    elem.timeToFinish = timeToFinish;\n                    clearInterval(elem.timer);\n                    _helper2.default.createTimer(elem);\n                    console.log('changeEVe tnttn', elem);\n                }\n            });\n        },\n        deleteEvent: function deleteEvent(nameOfEvent) {\n            events.forEach(function (elem, index) {\n                if (elem.nameOfEvent === nameOfEvent) {\n                    clearInterval(elem.timer);\n                    events.splice(index, 1);\n                }\n            });\n        },\n\n\n        get getEvents() {\n            return events;\n        }\n    };\n}();\n\nvar testFunc = function testFunc() {\n    console.log('TEST FUNc');\n};\n\nvar testFunc1 = function testFunc1() {\n    console.log('TEST FUNc');\n};\n\ncalendar.createEvent('nameOfEvent', '28.04.2018', '12:11:00', testFunc);\ncalendar.createEvent('nameOfE2vent', '28.04.2018', '11:59:00', testFunc1);\ncalendar.changeEvent('NEW NAME nameOfE2vent', '28.04.2018', '12:12:00', testFunc);\n// calendar.changeEvent('nameOfEvent', '28.04.2018', '16:30:00', function newFunc() {});\n// calendar.deleteEvent('nameOfEvent');\n\n_repeatEvent2.default.everySelectedDay('nameOfEvent', '28.04.2018', '12:11:00', testFunc, 1, 2, 3);\n\nexports.default = calendar;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9tYWluLmpzPzdhOTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhlbHBlck1vZHVsZSBmcm9tICcuL21vZHVsZXMvaGVscGVyJztcbmltcG9ydCByZXBlYXRNb2R1bGUgZnJvbSAnLi9tb2R1bGVzL3JlcGVhdEV2ZW50JztcblxuY29uc3QgY2FsZW5kYXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlRXZlbnQobmFtZU9mRXZlbnQsIGRhdGUsIHRpbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lVG9GaW5pc2ggPSBoZWxwZXJNb2R1bGUucGFyc2VEYXRhKGRhdGUsIHRpbWUpLnRpbWVUb0ZpbmlzaDtcbiAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xuICAgICAgICAgICAgICAgIG5hbWVPZkV2ZW50LFxuICAgICAgICAgICAgICAgIHRpbWVUb0ZpbmlzaCxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGhlbHBlck1vZHVsZS5jcmVhdGVUaW1lcihuZXdFdmVudCk7XG4gICAgICAgICAgICBldmVudHMucHVzaChuZXdFdmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hhbmdlRXZlbnQobmFtZU9mRXZlbnQsIGRhdGUsIHRpbWUsIGV2ZW50KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VFdmVudGNoYW5nZUV2ZW50Y2hhbmdlRXZlbnQnKTtcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VFdmVudCBlbGVtJywgZWxlbSk7XG4gICAgICAgICAgICAgICAgaWYoZWxlbS5ldmVudCA9PT0gZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChlbGVtLnRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVRvRmluaXNoID0gaGVscGVyTW9kdWxlLnBhcnNlRGF0YShkYXRlLCB0aW1lKS50aW1lVG9GaW5pc2g7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0ubmFtZU9mRXZlbnQgPSBuYW1lT2ZFdmVudDtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS50aW1lVG9GaW5pc2ggPSB0aW1lVG9GaW5pc2g7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWxlbS50aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIGhlbHBlck1vZHVsZS5jcmVhdGVUaW1lcihlbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZUVWZSB0bnR0bicsIGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlbGV0ZUV2ZW50KG5hbWVPZkV2ZW50KSB7XG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlbGVtLm5hbWVPZkV2ZW50ID09PSBuYW1lT2ZFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGVsZW0udGltZXIpO1xuICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZ2V0RXZlbnRzICgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudHM7XG4gICAgICAgIH1cbiAgICB9O1xufSgpKTtcblxuY29uc3QgdGVzdEZ1bmMgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1RFU1QgRlVOYycpO1xufTtcblxuY29uc3QgdGVzdEZ1bmMxID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdURVNUIEZVTmMnKTtcbn07XG5cbmNhbGVuZGFyLmNyZWF0ZUV2ZW50KCduYW1lT2ZFdmVudCcsICcyOC4wNC4yMDE4JywgJzEyOjExOjAwJywgdGVzdEZ1bmMpO1xuY2FsZW5kYXIuY3JlYXRlRXZlbnQoJ25hbWVPZkUydmVudCcsICcyOC4wNC4yMDE4JywgJzExOjU5OjAwJywgdGVzdEZ1bmMxKTtcbmNhbGVuZGFyLmNoYW5nZUV2ZW50KCdORVcgTkFNRSBuYW1lT2ZFMnZlbnQnLCAnMjguMDQuMjAxOCcsICcxMjoxMjowMCcsIHRlc3RGdW5jKTtcbi8vIGNhbGVuZGFyLmNoYW5nZUV2ZW50KCduYW1lT2ZFdmVudCcsICcyOC4wNC4yMDE4JywgJzE2OjMwOjAwJywgZnVuY3Rpb24gbmV3RnVuYygpIHt9KTtcbi8vIGNhbGVuZGFyLmRlbGV0ZUV2ZW50KCduYW1lT2ZFdmVudCcpO1xuXG5yZXBlYXRNb2R1bGUuZXZlcnlTZWxlY3RlZERheSgnbmFtZU9mRXZlbnQnLCAnMjguMDQuMjAxOCcsICcxMjoxMTowMCcsIHRlc3RGdW5jLCAxICwyICwzKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsZW5kYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFpbi5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUF2Q0E7QUF5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!***************************!*\
  !*** ./modules/helper.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _main = __webpack_require__(/*! ../main */ 0);\n\nvar _main2 = _interopRequireDefault(_main);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n    return {\n        createTimer: function createTimer(newEvent) {\n            newEvent.timer = setInterval(function () {\n                newEvent.timeToFinish = newEvent.timeToFinish - 1;\n                console.log('timeLeft', newEvent.timeToFinish);\n                if (newEvent.timeToFinish <= 0) {\n                    newEvent.event();\n                    _main2.default.deleteEvent(newEvent.nameOfEvent);\n                }\n            }, 1000);\n        },\n        parseData: function parseData(date, time) {\n            var dateObj = this.parseDate(date);\n            var timeObj = this.parseTime(time);\n            var dateNowInMiliSeconds = new Date().getTime();\n            var dateBeforeFinishInMiliSeconds = new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second).getTime();\n            var chosenDate = new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second);\n            var timeToFinish = parseInt((dateBeforeFinishInMiliSeconds - dateNowInMiliSeconds) / 1000);\n            console.log('timeToFinish', timeToFinish);\n            return {\n                timeToFinish: timeToFinish,\n                chosenDate: chosenDate\n            };\n        },\n        parseDate: function parseDate(date) {\n            var arrayDate = date.split('.');\n            var day = arrayDate[0];\n            var month = arrayDate[1] - 1;\n            var year = arrayDate[2];\n\n            return {\n                day: day,\n                month: month,\n                year: year\n            };\n        },\n        parseTime: function parseTime(time) {\n            var arrayTime = time.split(':');\n            var hour = arrayTime[0];\n            var minute = arrayTime[1];\n            var second = arrayTime[2];\n\n            return {\n                hour: hour,\n                minute: minute,\n                second: second\n            };\n        }\n    };\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9tb2R1bGVzL2hlbHBlci5qcz8zYWMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYWxlbmRhckV2ZW50cyBmcm9tICcuLi9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUaW1lcihuZXdFdmVudCkge1xuICAgICAgICAgICAgbmV3RXZlbnQudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3RXZlbnQudGltZVRvRmluaXNoID0gbmV3RXZlbnQudGltZVRvRmluaXNoIC0gMTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGltZUxlZnQnLCBuZXdFdmVudC50aW1lVG9GaW5pc2gpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdFdmVudC50aW1lVG9GaW5pc2ggPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdFdmVudC5ldmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBjYWxlbmRhckV2ZW50cy5kZWxldGVFdmVudChuZXdFdmVudC5uYW1lT2ZFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFyc2VEYXRhIChkYXRlLCB0aW1lKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlT2JqID0gdGhpcy5wYXJzZURhdGUoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCB0aW1lT2JqID0gdGhpcy5wYXJzZVRpbWUodGltZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRlTm93SW5NaWxpU2Vjb25kcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZUJlZm9yZUZpbmlzaEluTWlsaVNlY29uZHMgPSBuZXcgRGF0ZShkYXRlT2JqLnllYXIsIGRhdGVPYmoubW9udGgsIGRhdGVPYmouZGF5LCB0aW1lT2JqLmhvdXIsIHRpbWVPYmoubWludXRlLCB0aW1lT2JqLnNlY29uZCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgY29uc3QgY2hvc2VuRGF0ZSA9IG5ldyBEYXRlKGRhdGVPYmoueWVhciwgZGF0ZU9iai5tb250aCwgZGF0ZU9iai5kYXksIHRpbWVPYmouaG91ciwgdGltZU9iai5taW51dGUsIHRpbWVPYmouc2Vjb25kKTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVUb0ZpbmlzaCA9IHBhcnNlSW50KChkYXRlQmVmb3JlRmluaXNoSW5NaWxpU2Vjb25kcyAtIGRhdGVOb3dJbk1pbGlTZWNvbmRzKSAvIDEwMDApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RpbWVUb0ZpbmlzaCcsIHRpbWVUb0ZpbmlzaCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRpbWVUb0ZpbmlzaCxcbiAgICAgICAgICAgICAgICBjaG9zZW5EYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnNlRGF0ZSAoZGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlEYXRlID0gZGF0ZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgZGF5ID0gYXJyYXlEYXRlWzBdO1xuICAgICAgICAgICAgY29uc3QgbW9udGggPSBhcnJheURhdGVbMV0gLSAxO1xuICAgICAgICAgICAgY29uc3QgeWVhciA9IGFycmF5RGF0ZVsyXTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXksXG4gICAgICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAgICAgeWVhclxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBwYXJzZVRpbWUodGltZSkge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlUaW1lID0gdGltZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgY29uc3QgaG91ciA9IGFycmF5VGltZVswXTtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZSA9IGFycmF5VGltZVsxXTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZCA9IGFycmF5VGltZVsyXTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBob3VyLFxuICAgICAgICAgICAgICAgIG1pbnV0ZSxcbiAgICAgICAgICAgICAgICBzZWNvbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufSgpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbW9kdWxlcy9oZWxwZXIuanMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFsREE7QUFvREEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!********************************!*\
  !*** ./modules/repeatEvent.js ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _main = __webpack_require__(/*! ../main */ 0);\n\nvar _main2 = _interopRequireDefault(_main);\n\nvar _helper = __webpack_require__(/*! ./helper */ 1);\n\nvar _helper2 = _interopRequireDefault(_helper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n    var secondsInDay = 86400 * 1000;\n    return {\n        everyDay: function everyDay(nameOfEvent, date, time, event) {\n            setInterval(function () {\n                _main2.default.createEvent(nameOfEvent, date, time, event);\n            }, secondsInDay);\n        },\n        everySelectedDay: function everySelectedDay(nameOfEvent, date, time, event) {\n            var currentDayOfWeek = new Date().getDay();\n            var parsedDate = _helper2.default.parseData(date, time);\n            console.log(parsedDate.day);\n\n            for (var _len = arguments.length, selectedDays = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {\n                selectedDays[_key - 4] = arguments[_key];\n            }\n\n            console.log('includes', selectedDays.includes(currentDayOfWeek));\n        }\n    };\n}();\n\nvar testFunc = function testFunc() {\n    console.log('TEST FUNc');\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9tb2R1bGVzL3JlcGVhdEV2ZW50LmpzP2EwYjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhbGVuZGFyRXZlbnRzIGZyb20gJy4uL21haW4nO1xuaW1wb3J0IGhlbHBlck1vZHVsZSBmcm9tICcuL2hlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgc2Vjb25kc0luRGF5ID0gODY0MDAgKiAxMDAwO1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2ZXJ5RGF5KG5hbWVPZkV2ZW50LCBkYXRlLCB0aW1lLCBldmVudCkge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGVuZGFyRXZlbnRzLmNyZWF0ZUV2ZW50KG5hbWVPZkV2ZW50LCBkYXRlLCB0aW1lLCBldmVudCk7XG4gICAgICAgICAgICB9LCBzZWNvbmRzSW5EYXkpO1xuICAgICAgICB9LFxuICAgICAgICBldmVyeVNlbGVjdGVkRGF5KG5hbWVPZkV2ZW50LCBkYXRlLCB0aW1lLCBldmVudCwgLi4uc2VsZWN0ZWREYXlzKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF5T2ZXZWVrID0gbmV3IERhdGUoKS5nZXREYXkoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGUgPSBoZWxwZXJNb2R1bGUucGFyc2VEYXRhKGRhdGUsIHRpbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGFyc2VkRGF0ZS5kYXkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luY2x1ZGVzJywgc2VsZWN0ZWREYXlzLmluY2x1ZGVzKGN1cnJlbnREYXlPZldlZWspKTtcbiAgICAgICAgfVxuICAgIH07XG59KCkpO1xuXG5jb25zdCB0ZXN0RnVuYyA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnVEVTVCBGVU5jJyk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBtb2R1bGVzL3JlcGVhdEV2ZW50LmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBWEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ })
/******/ ]);