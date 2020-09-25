var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = {};
    }
    EventBus.prototype.on = function (event, listener) {
        if (typeof this.listeners[event] === 'undefined') {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    };
    EventBus.prototype.off = function (event, listener) {
        if (typeof this.listeners[event] === 'undefined') {
            throw new Error("Event " + event + " not exists");
        }
        this.listeners[event] = this.listeners[event].filter(function (busListener) { return listener !== busListener; });
    };
    EventBus.prototype.emit = function (event) {
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        if (typeof this.listeners[event] === 'undefined') {
            console.error("Event " + event + " not exists");
            return;
        }
        this.listeners[event].forEach(function (listener) { return listener(props); });
    };
    return EventBus;
}());
export { EventBus };
