var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '../../core/Component.js';
import { Router } from '../../core/Router/Router.js';
import { DialogsListStore } from '../../stores/dialogs.store.js';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this._availableRoutes = [
            '/chat',
            '/profile',
            '/menu',
            '/login',
            '/registration',
        ];
        _this.router = Router.getInstance();
        _this.router.subscribe(_this);
        _this.router.go(window.location.pathname === '/' ? '/chat' : window.location.pathname);
        _this.dialogsStore = DialogsListStore.getInstance();
        _this.dialogsStore.subscribe(_this);
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.dialogsStore.startLoadItems();
    };
    App.prototype.componentWillUnmount = function () {
        this.router.unsubscribe(this);
    };
    App.prototype.render = function () {
        var pathname = this._props.router.pathname;
        return [
            "\n        <div class=\"app\">\n            {% if pathname === \"/chat\" || pathname === \"/profile\" || pathname === \"/menu\" %}\n                <LeftPanel />\n                {% if pathname === \"/profile\" %}\n                    <Profile />\n                {% elif pathname === \"/chat\" || pathname === \"/menu\" %}\n                    <DialogsList />\n                    {% if props.dialogs.selectedDialogId === null %}\n                      <div class=\"chat-panel chat-panel--empty\">\n                        \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0442 \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\n                      </div>\n                    {% else %}\n                      <ChatPanel selectedChatId={{props.dialogs.selectedDialogId}} />\n                    {% endif %}\n                {% endif %}\n            {% endif %}\n            {% if pathname === \"/login\" %}\n                <Login />\n            {% elif pathname === \"/registration\" %}\n                <Registration />\n            {% endif %}\n            {% if !routes.includes(pathname) %}\n              <ErrorPage code=\"404\" title=\"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430\" />\n            {% endif %}\n            </div>\n    ",
            { pathname: pathname, routes: this._availableRoutes },
        ];
    };
    return App;
}(Component));
export { App };
if (typeof templator !== 'undefined') {
    templator.registry.register('App', App);
}
