const helperModule = (function () {

    return {
        getDateDifference (newDate) {
            const nowDate = new Date().getTime();
            const chosenDate = newDate.getTime();
            return parseInt((chosenDate - nowDate) / MILISECONDS);
        },

        getFormatDate (date, time) {
            if (!date) {console.error('Date must be a object with property date'); return;}
            const parsedDate = this.getParseDate(date);
            const parsedTime = this.getParseTime(time);
            if (parsedDate && parsedTime) {
                return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
            }
        },

        getMinTimeValue (events) {
            const notFinished = this.handleEventsPending(events);
            return notFinished.length && notFinished.reduce((prev, curr) => prev.newDate.getTime() < curr.newDate.getTime() ? prev : curr);
        },

        handleEventsPending(events) {
            return events.filter(event => !event.isFinished);
        },

        removeDuplicates(array) {
            return [...new Set(array)];
        },

        getParseDate (date) {
            const dateArray = date ? date.split('.') : [];
            if (!this.isValidDate(dateArray)) {console.error('Date format: dd.mm.yyyy'); return;}
            const day = dateArray[0];
            const month = dateArray[1] - 1;
            const year = dateArray[2];
            if (day.length > MAX_LETTERS_IN_DAY || month.length > MAX_LETTERS_IN_MONTH || year.length !== LETTERS_IN_YEAR) return;

            return {
                day,
                month,
                year
            };
        },

        getParseTime(time) {
            const timeArray = time ? time.split(':') : [];
            if (time && !this.isValidDate(timeArray)) {console.error('Time format: hh:mm:ss'); return;}
            const hour = timeArray[0] || DEFAULT_TIME;
            const minute = timeArray[1] || DEFAULT_TIME;
            const second = timeArray[2] || DEFAULT_TIME;

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

        // isValidDate(dateArray) {
        //     return dateArray.length && (dateArray.length === 3);
        // },
        //
        // isFinishedTime(newDate) {
        //     return this.getDateDifference(newDate) > 0;
        // },
        //
        // isNumber(value) {
        //     if (value <= 0) return false;
        //     return Number.isInteger(value);
        // },
        //
        // isString(value) {
        //     return typeof value === 'string';
        // },
        //
        // isFunction(value) {
        //     if (typeof value === 'function') {
        //         return true;
        //     } else {
        //         console.error('Please enter function');
        //         return false;
        //     }
        // }
    };

}());
