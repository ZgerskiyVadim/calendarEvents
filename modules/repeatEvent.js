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

    function getDateOfNewDay (addDaysBeforeTriggerEvent, newDate) {
        let year = newDate ? newDate.getFullYear() : new Date().getFullYear();
        let month = newDate ? newDate.getMonth() + 1 : new Date().getMonth() + 1;
        const daysInCurrentMonth =  new Date(year, month, 0).getDate();
        let day = newDate ? newDate.getDate() + addDaysBeforeTriggerEvent : new Date().getDate() + addDaysBeforeTriggerEvent;
        let hours = newDate ? newDate.getHours() : new Date().getHours();
        let minutes = newDate ? newDate.getMinutes() : new Date().getMinutes();
        let seconds = newDate ? newDate.getSeconds() : new Date().getSeconds() + 1;

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
            'time': `${hours}:${minutes}:${seconds}`
        };
    }

    calendarEvents.everyDay = function(idOrName, eventDate, options) {
        if (arguments.length === 1) {
            this.getEvents.forEach(event => {
                if(event.id === idOrName) {
                    const dateOfNewDay = getDateOfNewDay(1, event.newDate);
                    eventDate = {...eventDate, date: dateOfNewDay.date, time: dateOfNewDay.time};
                    options = {callback: event.callback, repeatEveryDay: true};
                    calendarEvents.createEvent(event.eventName, eventDate, options);
                }
            });
        } else {
            options = {...options, repeatEveryDay: true};
            calendarEvents.createEvent(idOrName, eventDate, options);
        }
    };

    calendarEvents.everySelectedDay = function(idOrName, eventDate, options, ...selectedDays) {
        //remove duplicates
        selectedDays = [...new Set(selectedDays)];
        if (!helperModule.selectedDaysIsValid(selectedDays)) return;
        calendarEvents.createEvent(idOrName, date, time, callback);

        observer.subscribe(id, function () {
            const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
            const dateOfNewDay = getDateOfNewDay(countOfDays);
            calendarEvents.createEvent(idOrName, dateOfNewDay.date, dateOfNewDay.time, callback);
        });
    };

}(calendarEvents));
