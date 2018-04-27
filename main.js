'use strict';

var calendar = function () {
    var events = [];

    return {
        createEvent: function createEvent(nameOfEvent, date, time, event) {
            var parsedData = moduleHelper.parseData(date, time);
            var newEvent = {
                nameOfEvent: nameOfEvent,
                parsedData: parsedData,
                event: event
            };
            moduleHelper.createTimer(newEvent, parsedData);
            events.push(newEvent);
        },
        changeEvent: function changeEvent(nameOfEvent, date, time, event) {
            console.log('changeEventchangeEventchangeEvent');
            events.forEach(function (elem) {
                console.log('changeEvent elem', elem);
                if (elem.nameOfEvent === nameOfEvent) {
                    clearInterval(elem.timer);
                    var parsedData = moduleHelper.parseData(date, time);
                    elem.nameOfEvent = nameOfEvent;
                    elem.parsedData = parsedData;
                    elem.event = event;
                    moduleHelper.createTimer(elem, parsedData);
                    console.log('changeEVe tnttn', elem);
                }
            });
        },
        deleteEvent: function deleteEvent(nameOfEvent) {
            events.forEach(function (elem) {
                if (elem.nameOfEvent === nameOfEvent) {
                    clearInterval(elem.timer);
                }
            });
        },


        get getEvent() {
            return events;
        }
    };
}();

var moduleHelper = function () {
    return {
        createTimer: function createTimer(newEvent) {
            newEvent.timer = setInterval(function () {
                console.log('event', newEvent.event);
            }, 2000);
        },
        parseData: function parseData(date, time) {
            var dateObj = this.parseDate(date);
            var timeObj = this.parseTime(time);

            return new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second);
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
            var arrayTime = time.split(':');
            var hour = arrayTime[0];
            var minute = arrayTime[1];
            var second = arrayTime[2];

            return {
                hour: hour,
                minute: minute,
                second: second
            };
        }
    };
}();

function testFunc(someText) {
    return someText;
}

calendar.createEvent('nameOfEvent', '12.12.1993', '16:30:00', testFunc);
calendar.changeEvent('nameOfEvent', '22.22.2993', '16:30:00', function newFunc() {});
// calendar.deleteEvent('nameOfEvent');
