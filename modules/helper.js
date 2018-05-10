import throwError from "../throwError";
import { miliseconds } from '../constants';

export default (function () {

    return {
        calculateDateDifference (newDate) {
            const nowDate = new Date().getTime();
            const chosenDate = newDate.getTime();
            return parseInt((chosenDate - nowDate) / miliseconds);
        },

        newDate (date, time) {
            const parsedDate = this.parseDate(date);
            const parsedTime = this.parseTime(time);
            if (!parsedDate || !parsedTime) return;
            return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
        },

        minValueOfTime (events) {
            const notFinished = this.notFinishedEvents(events);
            return notFinished.length && notFinished.reduce((prev, curr) => prev.timeToFinish < curr.timeToFinish ? prev : curr);
        },

        notFinishedEvents(events) {
            return events.filter(event => !event.isFinished);
        },

        parseDate (date) {
            const arrayDate = date ? date.split('.') : [];
            if (this.dateIsNotValid(arrayDate)) return;
            const day = arrayDate[0];
            const month = arrayDate[1] - 1;
            const year = arrayDate[2];
            if (day.length > 2 || month.length > 2 || year.length !== 4) return;

            return {
                day,
                month,
                year
            };
        },

        parseTime(time) {
            const arrayTime = time ? time.split(':') : [];
            if (time && this.dateIsNotValid(arrayTime)) return;
            const hour = arrayTime[0] || 0;
            const minute = arrayTime[1] || 0;
            const second = arrayTime[2] || 0;

            return {
                hour,
                minute,
                second
            };
        },

        generateId() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(2);
        },

        dataIsValid(eventName, newDate, callback) {
            if (!this.isString(eventName)) {throwError('Event name must be a string'); return false;}
            if (!newDate) {throwError('Please enter valid date or time'); return false;}
            if (callback && !this.isFunction(callback)) {throwError('Please enter function'); return false;}
            return true;
        },

        dateIsNotValid(arrayOfDate) {
            return !arrayOfDate.length || (arrayOfDate.length !== 3);
        },

        selectedDaysIsValid(selectedDays) {
            const selectedDaysLength = selectedDays.length;
            for (let i = 0; i < selectedDaysLength; i++) {
                if(!this.isNumber(selectedDays[i])) {throwError('Selected days must be a number'); return false;}
            }
            return true;
        },

        isNumber(value) {
            if (value <= 0) return false;
            return Number.isInteger(value);
        },

        isString(value) {
            return typeof value === 'string';
        },

        isFunction(value) {
            return typeof value === 'function';
        }
    };
}());
