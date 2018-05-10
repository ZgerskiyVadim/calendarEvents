(function (calendarEvents) {

    function calculateCountDaysBeforeSelectedDay(selectedDays) {
        const currentDayOfWeek = new Date().getDay();

        return selectedDays
            .map(selectedDay =>
                (selectedDay - currentDayOfWeek) < 0 ?
                    daysInWeek - (currentDayOfWeek - selectedDay) :
                    (selectedDay - currentDayOfWeek) ? (selectedDay - currentDayOfWeek) : daysInWeek)
            .reduce((prev, curr) => prev < curr ? prev : curr);
    }

    function getDateOfNewDay (addDaysBeforeTriggerEvent) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        const daysInCurrentMonth =  new Date(year, month, 0).getDate();
        let day = new Date().getDate();

        day = day + addDaysBeforeTriggerEvent;

        if (day >  daysInCurrentMonth) {
            day = day - daysInCurrentMonth;
            month = month + 1;
        }
        if (month > numberOfMonthInYear) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': `${day}.${month}.${year}`,
            'time': `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds() + 1}`
        };
    }

    calendarEvents.everyDay = function(idOrName, date, time, callback) {
        if (arguments.length === 1) {
            const notFinished = helperModule.notFinishedEvents(this.getEvents);
            notFinished.forEach(event => (event.id === idOrName) && (event.everyDay = true));
            console.table(this.getEvents);
        } else {
            calendarEvents.createEvent(idOrName, date, time, callback);
        }

        // observer.subscribe(id, function () {
        //     const dateOfNewDay = getDateOfNewDay(1);
        //     calendarEvents.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback, id);
        // });
    };

    calendarEvents.everySelectedDay = function(eventName, date, time, callback, id, ...selectedDays) {
        id = id || helperModule.generateId();
        //remove duplicates
        selectedDays = [...new Set(selectedDays)];
        if (!helperModule.selectedDaysIsValid(selectedDays)) return;
        calendarEvents.createEvent(eventName, date, time, callback, id);

        observer.subscribe(id, function () {
            const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
            const dateOfNewDay = getDateOfNewDay(countOfDays);
            calendarEvents.createEvent(eventName, dateOfNewDay.date, dateOfNewDay.time, callback, id);
        });
    };

}(calendarEvents));
