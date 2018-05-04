class Observable {
    constructor () {
        this.observers = [{key: 'aa', funcs:[old]}];
    }

    subscribe (key, func) {
        if (this.observers.length) {
            this.observers.forEach(subscriber => {
                subscriber.key === key ? subscriber.funcs.push(func) : this.observers.push({key, funcs: [func]});
            });
        } else {
            this.observers.push({key, funcs: [func]});
        }
    }

    updateKey(prevKey, newKey) {
        this.observers.forEach(subscriber => {
            if (subscriber.key === prevKey) {
                subscriber.key = newKey;
            }
        });
    }

    unsubscribe (key) {
        this.observers = this.observers.filter(subscriber => subscriber.key !== key);
    }

    unsubscribeFunc(func) {
        this.observers.forEach((subscriber, index) => {
            subscriber.funcs.forEach(f => f === func ? this.observers.slice(index, 1) : undefined);
        });
    }

    trigger (key) {
        this.observers.forEach(subscriber => subscriber.key === key ? subscriber.funcs.forEach(f => f()) : undefined);
        console.table(this.observers);
    }
}

const obs = new Observable();
obs.subscribe('aa', function () {
    console.log('NEW SUB');
});

obs.trigger('aa');

setInterval(()=> {
    obs.unsubscribeFunc(old);
}, 1000);

setTimeout(() => {
    obs.subscribe('bb', function () {
        console.log('SS');
    });
}, 3000);


setTimeout(() => {
    obs.trigger('bb');
}, 4000);

setInterval(()=> {
    obs.subscribe('aa', old);
    obs.trigger('aa');
}, 2000);

function old() {
    console.log('OLD SUB');
}

export default Observable;
