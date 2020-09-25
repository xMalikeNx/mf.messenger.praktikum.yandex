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
var LeftPanelMenu = /** @class */ (function (_super) {
    __extends(LeftPanelMenu, _super);
    function LeftPanelMenu() {
        var _this = _super.call(this) || this;
        _this.state = {
            links: [
                { title: 'Профиль', link: '/profile' },
                { title: 'Логин', link: '/login' },
                { title: 'Регистрация', link: '/registration' },
            ],
        };
        _this.router = Router.getInstance();
        _this.router.subscribe(_this);
        return _this;
    }
    LeftPanelMenu.prototype.render = function () {
        return [
            "\n            <div class=\"left-panel-menu opened\">\n                <div class=\"left-panel-menu__logo\">\n                    MNMessager\n                </div>\n                <nav class=\"left-panel-menu-list\">\n                    {% for link in state.links %}\n                        <Link link={{link.link}} text={{link.title}}\n                            {% if props.router.pathname === link.link %}\n                                className=\"left-panel-menu-list__item current\"\n                            {% else %}\n                                className=\"left-panel-menu-list__item\"\n                            {% endif %}\n                        />\n                    {% endfor %}\n                </nav>\n            </div>\n        ",
        ];
    };
    return LeftPanelMenu;
}(Component));
export { LeftPanelMenu };
if (typeof templator !== 'undefined') {
    templator.registry.register('LeftPanelMenu', LeftPanelMenu);
}
