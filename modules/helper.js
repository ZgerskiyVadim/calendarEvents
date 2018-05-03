export default (function () {

    return {

        getTimeInSeconds (newDate) {
            const nowDate = new Date().getTime();
            const chosenDate = newDate.getTime();
            return parseInt((chosenDate - nowDate) / 1000);
        },

        newDate (date, time) {
            const parsedDate = this.parseDate(date);
            const parsedTime = this.parseTime(time);
            return new Date(parsedDate.year, parsedDate.month, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
        },

        minValueOfTime (array) {
            return array.reduce((prev, curr) => prev.timeToFinish < curr.timeToFinish ? prev : curr);
        },

        parseDate (date) {
            const arrayDate = date.split('.');
            const day = arrayDate[0];
            const month = arrayDate[1] - 1;
            const year = arrayDate[2];

            return {
                day,
                month,
                year
            };
        },

        parseTime(time) {
            const arrayTime = time ? time.split(':') : [];
            const hour = arrayTime[0] || 0;
            const minute = arrayTime[1] || 0;
            const second = arrayTime[2] || 0;

            return {
                hour,
                minute,
                second
            };
        }
    };
}());
