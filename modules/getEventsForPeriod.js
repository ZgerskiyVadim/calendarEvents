(function (calendarEvents) {

    function getLastWeekDay(event, numberOfWeek) {
        const year = event.newDate.getFullYear();
        const month = event.newDate.getMonth();
        const firstWeekDayOfMonth = new Date(year, month).getDay() || COUNT_SUNDAY;

        return ((COUNT_DAYS_IN_WEEK - firstWeekDayOfMonth + 1) + (COUNT_DAYS_IN_WEEK * numberOfWeek));
    }


    calendarEvents.getEventsForDay = function(dayNumber) {
        if (!helperModule.isNumber(dayNumber)) return console.error('Please enter number of day when 1 - monday and 7 - sunday');
        return this.getEvents.filter(event => (event.newDate.getDay() || COUNT_SUNDAY) === dayNumber);
    };

    calendarEvents.getEventsForWeek = function(weekNumber) {
        if (!helperModule.isNumber(weekNumber)) return console.error('Please enter number of week when 1 - first week');
        const chosenWeek = weekNumber - 1;
        const previousLastWeekDay = chosenWeek - 1;
        return calendarEvents.getEvents.filter(event => {
            const dayOfMonth = event.newDate.getDate();
            return (getLastWeekDay(event, chosenWeek) >= dayOfMonth) && (dayOfMonth > getLastWeekDay(event, previousLastWeekDay));
        });
    };

    calendarEvents.getEventsForMonth = function(monthNumber) {
        if (!helperModule.isNumber(monthNumber)) return console.error('Please enter number of month when 1 - january and 12 - december');
        return this.getEvents.filter(event => event.newDate.getMonth() === (monthNumber - 1));
    };

    calendarEvents.getEventsForPeriod = function(startPeriod, finishPeriod) {
        startPeriod = helperModule.getFormatDate(startPeriod) && helperModule.getFormatDate(startPeriod).getTime();
        finishPeriod = helperModule.getFormatDate(finishPeriod) && helperModule.getFormatDate(finishPeriod).getTime();
        if (!startPeriod || !finishPeriod) return console.error('Please enter valid date');
        return this.getEvents.filter (event => event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod);
    };

}(calendarEvents));
