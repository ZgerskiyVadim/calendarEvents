window.addEventListener('load', function () {
    const eventsContainer = document.querySelector('.events');
    const event = eventsContainer.querySelector('.event');
    const countdown = document.querySelector('.countdown');
    calendarEvents.subscribeOnEvent(SHOW_EVENTS_IN_HTML, showEvents);

    function showEvents() {
        const eventsItems = calendarEvents.getEvents.map(event => {
            const time = `${event.newDate.getHours()}:${event.newDate.getMinutes()}:${event.newDate.getSeconds()}`;
            const date = `${event.newDate.getDate()}.${event.newDate.getMonth() + 1}.${event.newDate.getFullYear()}`;
            const modifyEvent = {...event, time, date};
            return modifyEvent;
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
        changeBgColor();
    }

    // Show countdown in html
    calendarEvents.subscribeOnEvent(COUNTDOWN, () => {
        countdown.innerHTML = calendarEvents.getCountDown;
    });

    // Change background for finished events
    function changeBgColor() {
        const finishedElems = document.querySelectorAll('.finished');
        finishedElems.forEach(finishedElem => {
            if (finishedElem.textContent.toString() === 'true') {
                const parentContainer = finishedElem.parentElement.parentElement;
                parentContainer.style.backgroundColor = 'rgba(0, 204, 0, 0.69)';
            } else {
                const ids = document.querySelectorAll('.id');
                const closestEvent = helperModule.minValueOfTime(calendarEvents.getEvents);
                ids.forEach(id => {
                    if (id.textContent.toString() === closestEvent.id.toString()) {
                        const parentContainer = id.parentElement.parentElement;
                        parentContainer.style.backgroundColor = 'darkorange';
                    }
                });
            }
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
            innerOfItem.finished.innerHTML = items[i].isFinished ? items[i].isFinished : false;
            eventsContainer.appendChild(item);
            item = item.cloneNode(true);
        }
    }

    function elementsInContent(item) {
        let id = item.querySelector('.id');
        let name = item.querySelector('.name');
        let date = item.querySelector('.date');
        let time = item.querySelector('.time');
        let finished = item.querySelector('.finished');
        return {id, name, date, time, finished};
    }
});