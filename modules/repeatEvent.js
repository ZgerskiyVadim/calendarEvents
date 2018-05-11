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
        if (month > numberOfMonthInYear) {
            month = 1;
            year = year + 1;
        }

        return {
            'date': `${day}.${month}.${year}`,
            'time': `${hours}:${minutes}:${seconds}`
        };
    }

    function subscribeOnEvent(newEvent, numberOfDaysBeforeEvent) {
        const newDate = getDateOfNewDay(numberOfDaysBeforeEvent, newEvent.newDate);
        const eventDate = {
            date: newDate.date,
            time: newDate.time
        };
        newEvent = calendarEvents.createEvent(newEvent.eventName, eventDate, newEvent.callback);
        calendarEvents.subscribe(newEvent.id, () => {
            subscribeOnEvent(newEvent, numberOfDaysBeforeEvent);
        });
    }

    calendarEvents.repeatEveryDay = function(idOrName, eventDate, options) {
        if (arguments.length === 1) {
            this.getEvents.forEach(event => {
                if(event.id === idOrName) {
                    subscribeOnEvent(event, 1);
                }
            });
        } else {
            const newEvent = calendarEvents.createEvent(idOrName, eventDate, options);
            subscribeOnEvent(newEvent, 1);
        }
    };

    // Need rewrite like for repeatEveryDay method

    // calendarEvents.repeatSelectedDays = function(idOrName, eventDate, options, ...selectedDays) {
    //     //remove duplicates
    //     selectedDays = [...new Set(selectedDays)];
    //     if (!helperModule.selectedDaysIsValid(selectedDays)) return;
    //     calendarEvents.createEvent(idOrName, date, time, callback);
    //
    //     observer.subscribe(id, function () {
    //         const countOfDays = calculateCountDaysBeforeSelectedDay(selectedDays);
    //         const dateOfNewDay = getDateOfNewDay(countOfDays);
    //         calendarEvents.createEvent(idOrName, dateOfNewDay.date, dateOfNewDay.time, callback);
    //     });
    // };

}(calendarEvents));
