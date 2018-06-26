(function (calendarEvents) {

    function getCountDaysBeforeSelectedDay(selectedDays, newDate) {
        const currentDayOfWeek = newDate ? newDate.getDay() : new Date().getDay();
        const daysBeforeSelectedDays = setDaysBeforeSelectedDays(selectedDays, currentDayOfWeek);

        return minDaysBeforeSelectedDay(daysBeforeSelectedDays);
    }

    function setDaysBeforeSelectedDays(selectedDays, currentDayOfWeek) {
        return selectedDays
            .map(selectedDay =>
                (selectedDay - currentDayOfWeek) < 0 ?
                    COUNT_DAYS_IN_WEEK - (currentDayOfWeek - selectedDay) :
                    (selectedDay - currentDayOfWeek) ? (selectedDay - currentDayOfWeek) : COUNT_DAYS_IN_WEEK);
    }

    function minDaysBeforeSelectedDay(daysBeforeSelectedDays) {
        return daysBeforeSelectedDays.reduce((prev, curr) => prev < curr ? prev : curr);
    }

    function getNewRepeatDate(daysBeforeEvent, newDate) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate() + daysBeforeEvent;
        const daysInCurrentMonth =  new Date(year, month, 0).getDate();
        const hours = newDate ? newDate.getHours() : new Date().getHours();
        const minutes = newDate ? newDate.getMinutes() : new Date().getMinutes();
        const seconds = newDate ? newDate.getSeconds() : new Date().getSeconds() + 1;

        if (day >  daysInCurrentMonth) {
            day = day - daysInCurrentMonth;
            month = month + 1;
        }
        if (month > COUNT_MONTHS_IN_YEAR) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': `${day}.${month}.${year}`,
            'time': `${hours}:${minutes}:${seconds}`
        };
    }

    function addFuncForRepeatEvent(newEvent, daysBeforeEvent, selectedDays) {
        calendarEvents.addFuncForEvent(newEvent.id, () => {
            daysBeforeEvent = selectedDays ? getCountDaysBeforeSelectedDay(selectedDays) : daysBeforeEvent;
            const eventDate = getNewRepeatDate(daysBeforeEvent);
            selectedDays ?
                calendarEvents.repeatSelectedDays(newEvent.eventName, eventDate, newEvent.callback, selectedDays) :
                calendarEvents.repeatEveryDay(newEvent.eventName, eventDate, newEvent.callback);
        });
    }

    function repeatFinishedEvent(newEvent, daysBeforeEvent, selectedDays) {
        const eventDate = getNewRepeatDate(daysBeforeEvent, newEvent.newDate);
        newEvent = calendarEvents.addNewEvent(newEvent.eventName, eventDate, newEvent.callback);
        addFuncForRepeatEvent(newEvent, daysBeforeEvent, selectedDays);
    }

    calendarEvents.repeatEveryDay = function(eventName, eventDate, callback) {
        const newEvent = calendarEvents.addNewEvent(eventName, eventDate, callback);
        newEvent && addFuncForRepeatEvent(newEvent, EVERY_DAY_VALUE_FOR_REPEAT);
    };

    calendarEvents.repeatEveryDayById = function (id) {
        this.getEvents.forEach(event =>
            (event.id === id) &&
            event.isFinished ?
                repeatFinishedEvent(event, EVERY_DAY_VALUE_FOR_REPEAT) :
                addFuncForRepeatEvent(event, EVERY_DAY_VALUE_FOR_REPEAT)
        );
    };

    calendarEvents.repeatSelectedDays = function(eventName, eventDate, callback, selectedDays) {
        if (!validationService.isValidSelectedDays(selectedDays)) return;
        selectedDays = helperModule.removeDuplicates(selectedDays);
        const newEvent = calendarEvents.addNewEvent(eventName, eventDate, callback);
        const countOfDays = getCountDaysBeforeSelectedDay(selectedDays);
        newEvent && addFuncForRepeatEvent(newEvent, countOfDays, selectedDays);
    };

    calendarEvents.repeatSelectedDaysById = function (id, selectedDays) {
        if (!validationService.isValidSelectedDays(selectedDays)) return;
        selectedDays = helperModule.removeDuplicates(selectedDays);

        this.getEvents.forEach(event => {
            if (event.id === id && event.isFinished) {
                const countOfDays = getCountDaysBeforeSelectedDay(selectedDays);
                repeatFinishedEvent(event, countOfDays, selectedDays);
            } else if (event.id === id) {
                const countOfDays = getCountDaysBeforeSelectedDay(selectedDays, event.newDate);
                addFuncForRepeatEvent(event, countOfDays, selectedDays);
            }
        });
    };

}(calendarEvents));
