import { EventBus } from '../EventBus.js';
var Router = /** @class */ (function () {
    function Router() {
        this._subscribers = [];
        this._history = window.history;
        this._eventBus = new EventBus();
        this._init();
        this._start();
    }
    Router.prototype._start = function () {
        var _this = this;
        window.onpopstate = (function (event) {
            _this._onChangeRoute();
        }).bind(this);
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({ user_id: 1 }, '', pathname);
        this._onChangeRoute();
    };
    Router.prototype.back = function () {
        this.history.back();
    };
    Router.prototype.forward = function () {
        this.history.forward();
    };
    Router.prototype._onChangeRoute = function () {
        this._eventBus.emit(Router.ROUTER_EVENTS.CR, this.pathname);
    };
    Router.prototype.subscribe = function (instance) {
        this._subscribers.push(instance);
        this.updateSubscriberProps(instance);
    };
    Router.prototype._init = function () {
        var _this = this;
        this._eventBus.on(Router.ROUTER_EVENTS.CR, function () {
            return _this._subscribers.forEach(function (subscriber) {
                return _this.updateSubscriberProps(subscriber);
            });
        });
    };
    Router.prototype.updateSubscriberProps = function (subscriber) {
        subscriber.setProps({ router: { pathname: this.pathname } });
    };
    Router.prototype.unsubscribe = function (instance) {
        this._subscribers = this._subscribers.filter(function (subscriber) { return subscriber !== instance; });
    };
    Object.defineProperty(Router.prototype, "pathname", {
        get: function () {
            return window.location.pathname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "history", {
        get: function () {
            return this._history;
        },
        enumerable: false,
        configurable: true
    });
    Router.getInstance = function () {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    };
    Router.ROUTER_EVENTS = {
        CR: 'changeRoute',
    };
    return Router;
}());
export { Router };
