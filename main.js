import helperModule from './modules/helper';
import repeatModule from './modules/repeatEvent';

const calendar = (function () {
    const events = [];

    return {
        createEvent(nameOfEvent, date, time, event) {
            const timeToFinish = helperModule.parseData(date, time).timeToFinish;
            const newEvent = {
                nameOfEvent,
                timeToFinish,
                event
            };
            helperModule.createTimer(newEvent);
            events.push(newEvent);
        },

        changeEvent(nameOfEvent, date, time, event){
            console.log('changeEventchangeEventchangeEvent');
            events.forEach(elem => {
                console.log('changeEvent elem', elem);
                if(elem.event === event) {
                    clearInterval(elem.timer);
                    const timeToFinish = helperModule.parseData(date, time).timeToFinish;
                    elem.nameOfEvent = nameOfEvent;
                    elem.timeToFinish = timeToFinish;
                    clearInterval(elem.timer);
                    helperModule.createTimer(elem);
                    console.log('changeEVe tnttn', elem);
                }
            });
        },

        deleteEvent(nameOfEvent) {
            events.forEach((elem, index) => {
                if(elem.nameOfEvent === nameOfEvent) {
                    clearInterval(elem.timer);
                    events.splice(index, 1);
                }
            });
        },

        get getEvents () {
            return events;
        }
    };
}());

const testFunc = () => {
    console.log('TEST FUNc');
};

const testFunc1 = () => {
    console.log('TEST FUNc');
};

calendar.createEvent('nameOfEvent', '28.04.2018', '12:11:00', testFunc);
calendar.createEvent('nameOfE2vent', '28.04.2018', '11:59:00', testFunc1);
calendar.changeEvent('NEW NAME nameOfE2vent', '28.04.2018', '12:12:00', testFunc);
// calendar.changeEvent('nameOfEvent', '28.04.2018', '16:30:00', function newFunc() {});
// calendar.deleteEvent('nameOfEvent');

repeatModule.everySelectedDay('nameOfEvent', '28.04.2018', '12:11:00', testFunc, 1 ,2 ,3);

export default calendar;
