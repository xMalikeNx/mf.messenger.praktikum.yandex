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
var Component = /** @class */ (function () {
    function Component(props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        this._props = {};
        this._state = {};
        this._element = null;
        this._eventBus = new EventBus();
        this._initEvents();
        this.props = props;
        setTimeout(function () { return _this.eventBus.emit(Component.EVENTS.INIT); }, 0);
    }
    Component.prototype._initEvents = function () {
        this.eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
        this.eventBus.on(Component.EVENTS.CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Component.EVENTS.CDU, this._componentDidUpdate.bind(this));
        this.eventBus.on(Component.EVENTS.RENDER, this._render.bind(this));
    };
    Component.prototype.setState = function (newState) {
        this.state = Object.assign(this.state, newState);
    };
    Component.prototype.setProps = function (newProps) {
        this.props = Object.assign(this.props, newProps);
    };
    Object.defineProperty(Component.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            var prevState = __assign({}, this.state);
            var prevProps = __assign({}, this.props);
            this._state = Object.assign(this.state, value);
            this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "props", {
        get: function () {
            return this._props;
        },
        set: function (value) {
            var prevState = __assign({}, this.state);
            var prevProps = __assign({}, this.props);
            this._props = Object.assign(this.props, value);
            this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "eventBus", {
        get: function () {
            return this._eventBus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype._init = function () {
        this.eventBus.emit(Component.EVENTS.CDM);
    };
    Component.prototype._componentDidMount = function () {
        this.componentDidMount();
    };
    Component.prototype._componentDidUpdate = function (prevProps, prevState) {
        var shouldRender = this.componentDidUpdate(prevProps, prevState);
        if (shouldRender) {
            this.eventBus.emit(Component.EVENTS.RENDER);
        }
    };
    Component.prototype._render = function () {
        if (this.element) {
            var _a = this.render(), template = _a[0], localVariables = _a[1];
            var el = templator.compileTemplate(template, this, localVariables);
            this.element.replaceWith(el);
            this.element = el;
        }
    };
    Component.prototype.componentDidMount = function () { };
    Component.prototype.componentDidUpdate = function (prevProps, prevState) {
        return true;
    };
    Component.prototype.render = function () {
        return [''];
    };
    Component.EVENTS = {
        INIT: 'init',
        CDM: 'componentDidMount',
        CDU: 'componentDidUpdate',
        RENDER: 'render',
    };
    return Component;
}());
export { Component };
