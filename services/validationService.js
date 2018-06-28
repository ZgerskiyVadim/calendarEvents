const validationService = (function () {

    return {

        isValidNameAndDate(eventName, newDate) {
            if (!validationService.isString(eventName)) {console.error('Event name must be a string'); return false;}
            if (!newDate) return false;
            if (!validationService.isFinishedTime(newDate)) {console.error('Please enter valid date or time'); return false;}
            return true;
        },

        isValidSelectedDays(selectedDays) {
            const selectedDaysLength = selectedDays && selectedDays.length;
            if (!selectedDaysLength) {console.error('Selected days must be array with number of days when 1 - monday and 7 - sunday'); return false;}
            for (let i = 0; i < selectedDaysLength; i++) {
                if(!validationService.isNumber(selectedDays[i])) {console.error('Selected days must be a number when 1 - monday and 7 - sunday'); return false;}
            }
            return true;
        },

        isValidSeconds(seconds) {
            if (!this.isNumber(seconds)) {console.error('Seconds must be a number'); return false;}
            return true;
        },

        isValidDate(dateArray) {
            return dateArray.length && (dateArray.length === 3);
        },

        isFinishedTime(newDate) {
            return helperModule.getDateDifference(newDate) > 0;
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