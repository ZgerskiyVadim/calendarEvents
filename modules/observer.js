class Observable {
    constructor () {
        this.observers = [];
    }

    subscribe (key, func) {
        const keyIsExist = this.observers
            .map(subscriber => subscriber.key)
            .includes(key);

        if (keyIsExist) {
            this.observers.forEach(subscriber => (subscriber.key === key) && subscriber.funcs.push(func));
        } else {
            this.observers.push({key, funcs: [func]});
        }
    }

    unsubscribe (key) {
        this.observers = this.observers.filter(subscriber => subscriber.key !== key);
    }

    unsubscribeFunc(key, func) {
        this.observers.forEach(subscriber => {
            if (subscriber.key === key) {
                subscriber.funcs.forEach((f, index) => {
                    (f === func) && (subscriber.funcs.splice(index, 1));
                    !subscriber.funcs.length && this.unsubscribe(subscriber.key);
                });
            }
        });
    }

    trigger (key) {
        this.observers.forEach(subscriber => (subscriber.key === key) && (subscriber.funcs.forEach(f => f())));
    }
}
