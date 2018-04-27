'use strict';

const calendar = (function () {
    const events = [];

    return {
        createEvent(nameOfEvent, date, time, event) {
            const parsedData = moduleHelper.parseData(date, time);
            const newEvent = {
                nameOfEvent,
                parsedData,
                event
            };
            moduleHelper.createTimer(newEvent, parsedData);
            events.push(newEvent);
        },

        changeEvent(nameOfEvent, date, time, event){
            console.log('changeEventchangeEventchangeEvent');
            events.forEach(elem => {
                console.log('changeEvent elem', elem);
                if(elem.nameOfEvent === nameOfEvent) {
                    clearInterval(elem.timer);
                    const parsedData = moduleHelper.parseData(date, time);
                    elem.nameOfEvent = nameOfEvent;
                    elem.parsedData = parsedData;
                    elem.event = event;
                    moduleHelper.createTimer(elem, parsedData);
                    console.log('changeEVe tnttn', elem);
                }
            });
        },

        deleteEvent(nameOfEvent) {
            events.forEach(elem => {
                if(elem.nameOfEvent === nameOfEvent) {
                    clearInterval(elem.timer);
                }
            });
        },

        get getEvent () {
            return events;
        }
    };
}());

const moduleHelper = (function () {
    return {
        createTimer(newEvent) {
            newEvent.timer = setInterval(function () {
                console.log('event', newEvent.event);
            }, 2000);
        },

        parseData (date, time) {
            const dateObj = this.parseDate(date);
            const timeObj = this.parseTime(time);

            return new Date(dateObj.year, dateObj.month, dateObj.day, timeObj.hour, timeObj.minute, timeObj.second);
        },

        parseDate (date) {
            const arrayDate = date.split('.');
            const day = arrayDate[0];
            const month = arrayDate[1] - 1;
            const year = arrayDate[2];

            return {
                day,
                month,
                year
            };
        },

        parseTime(time) {
            const arrayTime = time.split(':');
            const hour = arrayTime[0];
            const minute = arrayTime[1];
            const second = arrayTime[2];

            return {
                hour,
                minute,
                second
            };
        }
    };
}());

function testFunc(someText) {
    return someText;
}

calendar.createEvent('nameOfEvent', '12.12.1993', '16:30:00', testFunc);
calendar.changeEvent('nameOfEvent', '22.22.2993', '16:30:00', function newFunc() {});
// calendar.deleteEvent('nameOfEvent');