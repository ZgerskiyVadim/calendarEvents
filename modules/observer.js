class Observable {
    constructor () {
        this.observers = [];
    }

    subscribe (key, func) {
        this.observers.push({key, func});
    }

    unsubscribe (func) {
        this.observers = this.observers.filter(subscriber => subscriber.func !== func);
    }

    trigger (key) {
        this.observers.forEach(subscriber => {
            subscriber.key === key ? subscriber.func() : undefined;
        });
    }
}

export default Observable;
