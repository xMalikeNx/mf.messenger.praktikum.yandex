var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { EventBus } from './EventBus.js';
var Store = /** @class */ (function () {
    function Store() {
        this._state = {};
        this._displayName = null;
        this._subscribers = [];
        this._eventBus = new EventBus();
        this._init();
    }
    Object.defineProperty(Store.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this._eventBus.emit(Store.EVENTS.UPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Store.prototype.subscribe = function (instance) {
        if (this._displayName === null) {
            console.error('Display name not provided');
            return;
        }
        this._subscribers.push(instance);
        this.updateSubscriberProps(instance);
    };
    Store.prototype._init = function () {
        var _this = this;
        this._eventBus.on(Store.EVENTS.UPDATE, function () {
            return _this._subscribers.forEach(function (subscriber) {
                return _this.updateSubscriberProps(subscriber);
            });
        });
    };
    Store.prototype.updateSubscriberProps = function (subscriber) {
        var _a;
        subscriber.setProps((_a = {},
            _a[this._displayName] = __assign({}, this._state),
            _a));
    };
    Store.prototype.unsubscribe = function (instance) {
        this._subscribers = this._subscribers.filter(function (subscriber) { return subscriber !== instance; });
    };
    Store.prototype.updateState = function (newState) {
        this.state = Object.assign(this.state, newState);
    };
    Store.getInstance = function () {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    };
    Store.EVENTS = {
        UPDATE: 'update',
    };
    Store.instance = null;
    return Store;
}());
export { Store };
