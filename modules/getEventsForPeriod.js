(function (calendarEvents) {

    function lastDayOfWeek(numberOfWeek) {
        const year = event.newDate.getFullYear();
        const month = event.newDate.getMonth();
        const firstWeekDayOfMonth = new Date(year, month).getDay() || SUNDAY;

        return ((DAYS_IN_WEEK - firstWeekDayOfMonth + 1) + (DAYS_IN_WEEK * numberOfWeek));
    }


    calendarEvents.perDay = function(dayNumber) {
        if (!helperModule.isNumber(dayNumber)) return console.error('Please enter number of day when 1 - monday and 7 - sunday');
        return this.getEvents.filter(event => (event.newDate.getDay() || SUNDAY) === dayNumber);
    };

    calendarEvents.perWeek = function(weekNumber) {
        if (!helperModule.isNumber(weekNumber)) return console.error('Please enter number of week when 1 - first week');
        const chosenWeek = weekNumber - 1;
        const lastWeek = chosenWeek - 1;
        return calendarEvents.getEvents.filter(event => {
            const dayOfMonth = event.newDate.getDate();
            return (lastDayOfWeek(chosenWeek) >= dayOfMonth) && (dayOfMonth > lastDayOfWeek(lastWeek));
        });
    };

    calendarEvents.perMonth = function(monthNumber) {
        if (!helperModule.isNumber(monthNumber)) return console.error('Please enter number of month when 1 - january and 12 - december');
        return this.getEvents.filter(event => event.newDate.getMonth() === (monthNumber - 1));
    };

    calendarEvents.perPeriod = function(startPeriod, finishPeriod) {
        startPeriod = helperModule.newDate(startPeriod) && helperModule.newDate(startPeriod).getTime();
        finishPeriod = helperModule.newDate(finishPeriod) && helperModule.newDate(finishPeriod).getTime();
        if (!startPeriod || !finishPeriod) return console.error('Please enter valid date');
        return this.getEvents.filter (event => event.newDate.getTime() >= startPeriod && event.newDate.getTime() <= finishPeriod);
    };
}(calendarEvents));
