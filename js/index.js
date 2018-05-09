import calendarEvents from '../modules/calendarEvents';
import { COUNTDOWN, SHOW_EVENTS_IN_HTML } from '../constants';

window.addEventListener('load', function () {
    const eventsContainer = document.querySelector('.events');
    const event = eventsContainer.querySelector('.event');
    calendarEvents.subscribe(SHOW_EVENTS_IN_HTML, showEvents);

    function showEvents() {
        const eventsItems = calendarEvents.getEvents.map(event => {
            event.time = `${event.newDate.getHours()}:${event.newDate.getMinutes()}:${event.newDate.getSeconds()}`;
            event.date = `${event.newDate.getDate()}.${event.newDate.getMonth() + 1}.${event.newDate.getFullYear()}`;
            return event;
        });
        event.style.display = 'flex';

        eventsContainer.innerHTML = '<h1>Events:</h1>' +
            '<h2 class="event">' +
            '<div>id: <span class="id"></span></div>' +
            '<div>name: <span class="name"></span></div>' +
            '<div>date: <span class="date"></span></div>' +
            '<div>time: <span class="time"></span></div>' +
            '</h2>';

        addItems(eventsItems);
        changeBgColor(eventsItems);
    }

    // Show countdown in html
    calendarEvents.subscribe(COUNTDOWN, () => {
        const countdown = document.querySelector('.countdown');
        countdown.innerHTML = calendarEvents.getCountDown;
    });

    // Change background for finished events
    function changeBgColor(eventsItems) {
        const eventsNotFinished = eventsItems.filter(event => event.isFinished);
        const ids = document.querySelectorAll('.id');

        eventsNotFinished.forEach(event => {
            ids.forEach(id => {
                if (event.id.toString() === id.textContent.toString()) {
                    const parentContainer = id.parentElement.parentElement;
                    parentContainer.style.backgroundColor = 'rgba(0, 204, 0, 0.69)';
                }
            });
        });
    }

    function addItems(items) {
        let item = event.cloneNode(true);
        event.style.display = 'none';

        for (let i = 0; i < items.length; i++) {
            let innerOfItem = elementsInContent(item);
            innerOfItem.id.innerHTML = items[i].id;
            innerOfItem.name.innerHTML = items[i].eventName;
            innerOfItem.date.innerHTML = items[i].date;
            innerOfItem.time.innerHTML = items[i].time;
            eventsContainer.appendChild(item);
            item = item.cloneNode(true);
        }
    }

    function elementsInContent(item) {
        let id = item.querySelector('.id');
        let name = item.querySelector('.name');
        let date = item.querySelector('.date');
        let time = item.querySelector('.time');
        return {id, name, date, time};
    }
});