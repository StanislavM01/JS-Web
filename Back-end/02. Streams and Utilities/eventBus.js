let subscribers = {}

function subscribe(eventType, callback) {
    if (!subscribers.hasOwnProperty(eventType)) {
        subscribers[eventType] = []
    }

    subscribers[eventType].push(callback)

    // subscribers[eventType].fillter(f => f != callback)
}

function publish(eventType,...params) {
    if (subscribers.hasOwnProperty(eventType)) {
        subscribers[eventType].forEach(f => f.apply(null,params));
    }
}

let eventBus = {
    subscribe,
    publish
}

module.exports = eventBus