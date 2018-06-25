const helperModule = (function () {

    return {
        calculateDateDifference (newDate) {
            const nowDate = new Date().getTime();
            const chosenDate = newDate.getTime();
            return parseInt((chosenDate - nowDate) / MILISECONDS);
        },

        newDate (date, time) {
            if (!date) {console.error('Date must be a object with property date'); return;}
            const parsedDate = this.parseDate(date);
            const parsedTime = this.parseTime(time);
            if (parsedDate && parsedTime) {
                return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
            }
        },

        minValueOfTime (events) {
            const notFinished = this.pendingEvents(events);
            return notFinished.length && notFinished.reduce((prev, curr) => prev.newDate.getTime() < curr.newDate.getTime() ? prev : curr);
        },

        pendingEvents(events) {
            return events.filter(event => !event.isFinished);
        },

        removeDuplicates(array) {
            return [...new Set(array)];
        },

        parseDate (date) {
            const arrayDate = date ? date.split('.') : [];
            if (this.arrayOfDateIsNotValid(arrayDate)) {console.error('Date format: dd.mm.yyyy'); return;}
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
            if (time && this.arrayOfDateIsNotValid(arrayTime)) {console.error('Time format: hh:mm:ss'); return;}
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
                .substring(1);
        },

        idIsValid(id) {
            if (!helperModule.isString(id)) {console.error('Event id must be a string'); return false;}
            return true;
        },

        arrayOfDateIsNotValid(arrayOfDate) {
            return !arrayOfDate.length || (arrayOfDate.length !== 3);
        },

        timeIsValid(newDate) {
            return this.calculateDateDifference(newDate) > 0;
        },

        isNumber(value) {
            if (value <= 0) return false;
            return Number.isInteger(value);
        },

        isString(value) {
            return typeof value === 'string';
        },

        isFunction(value) {
            if (typeof value === 'function') {
                return true;
            } else {
                console.error('Please enter function');
                return false;
            }
        }
    };
}());
