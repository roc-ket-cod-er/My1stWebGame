class Events {
    callbacks = [];
    nextId = 0;

    // Send events

    // Subscribe to something
    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback
        });
        return this.nextId;
    }

    // leave subscription
}

export const events = new Events();