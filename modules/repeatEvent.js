(function (calendarEvents) {

    function calculateCountDaysBeforeSelectedDay(selectedDays, newDate) {
        const currentDayOfWeek = newDate ? newDate.getDay() : new Date().getDay();

        return selectedDays
            .map(selectedDay =>
                (selectedDay - currentDayOfWeek) < 0 ?
                    DAYS_IN_WEEK - (currentDayOfWeek - selectedDay) :
                    (selectedDay - currentDayOfWeek) ? (selectedDay - currentDayOfWeek) : DAYS_IN_WEEK)
            .reduce((prev, curr) => prev < curr ? prev : curr);
    }

    function getDateOfNewDay(numberOfDaysBeforeEvent, newDate) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        const daysInCurrentMonth =  new Date(year, month, 0).getDate();
        let day = new Date().getDate() + numberOfDaysBeforeEvent;
        let hours = newDate ? newDate.getHours() : new Date().getHours();
        let minutes = newDate ? newDate.getMinutes() : new Date().getMinutes();
        let seconds = newDate ? newDate.getSeconds() : new Date().getSeconds() + 1;

        if (day >  daysInCurrentMonth) {
            day = day - daysInCurrentMonth;
            month = month + 1;
        }
        if (month > NUMBER_OF_MONTH_IN_YEAR) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': `${day}.${month}.${year}`,
            'time': `${hours}:${minutes}:${seconds}`
        };
    }

    function subscribeOnEvent(newEvent, numberOfDaysBeforeEvent, selectedDays) {
        calendarEvents.subscribeOnEvent(newEvent.id, () => {
            numberOfDaysBeforeEvent = selectedDays ? calculateCountDaysBeforeSelectedDay(selectedDays) : numberOfDaysBeforeEvent;
            const eventDate = getDateOfNewDay(numberOfDaysBeforeEvent);
            selectedDays ?
                calendarEvents.repeatSelectedDays(newEvent.eventName, eventDate, newEvent.callback, selectedDays) :
                calendarEvents.repeatEveryDay(newEvent.eventName, eventDate, newEvent.callback);
        });
    }

    function repeatFinishedEvent(newEvent, numberOfDaysBeforeEvent, selectedDays) {
        const eventDate = getDateOfNewDay(numberOfDaysBeforeEvent, newEvent.newDate);
        newEvent = calendarEvents.createEvent(newEvent.eventName, eventDate, newEvent.callback);
        subscribeOnEvent(newEvent, numberOfDaysBeforeEvent, selectedDays);
    }

    function selectedDaysIsValid(selectedDays) {
        const selectedDaysLength = selectedDays && selectedDays.length;
        if (!selectedDaysLength) {console.error('Selected days must be array with number of days when 1 - monday and 7 - sunday'); return false;}
        for (let i = 0; i < selectedDaysLength; i++) {
            if(!helperModule.isNumber(selectedDays[i])) {console.error('Selected days must be a number when 1 - monday and 7 - sunday'); return false;}
        }
        return true;
    }

    calendarEvents.repeatEveryDay = function(eventName, eventDate, callback) {
        const newEvent = calendarEvents.createEvent(eventName, eventDate, callback);
        newEvent && subscribeOnEvent(newEvent, REPEAT_EVERY_DAY);
    };

    calendarEvents.repeatEveryDayById = function (id) {
        if (!helperModule.idIsValid(id)) return;

        this.getEvents.forEach(event =>
            (event.id === id) &&
            (event.isFinished ?
                repeatFinishedEvent(event, REPEAT_EVERY_DAY) :
                subscribeOnEvent(event, REPEAT_EVERY_DAY))

        );
    };

    calendarEvents.repeatSelectedDays = function(eventName, eventDate, callback, selectedDays) {
        if (!selectedDaysIsValid(selectedDays)) return;
        selectedDays = helperModule.removeDuplicates(selectedDays);
        const newEvent = calendarEvents.createEvent(eventName, eventDate, callback);
        const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
        newEvent && subscribeOnEvent(newEvent, countOfDays, selectedDays);
    };

    calendarEvents.repeatSelectedDaysById = function (id, selectedDays) {
        if (!helperModule.idIsValid(id)) return;
        if (!selectedDaysIsValid(selectedDays)) return;
        selectedDays = helperModule.removeDuplicates(selectedDays);

        this.getEvents.forEach(event => {
            if (event.id === id && event.isFinished) {
                const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
                repeatFinishedEvent(event, countOfDays, selectedDays);
            } else if (event.id === id) {
                const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays, event.newDate);
                subscribeOnEvent(event, countOfDays, selectedDays);
            }
        });
    };

}(calendarEvents));
