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
var LeftPanel = /** @class */ (function (_super) {
    __extends(LeftPanel, _super);
    function LeftPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function (tag) { return function () {
            var onClick = _this.props.onClick;
            if (typeof onClick === 'function') {
                onClick(tag);
            }
        }; };
        _this.state = {
            items: [
                {
                    link: '/menu',
                    icon: 'fa fa-bars',
                },
                {
                    link: '/chat',
                    icon: 'fa fa-comment',
                },
            ],
        };
        _this.router = Router.getInstance();
        _this.router.subscribe(_this);
        return _this;
    }
    LeftPanel.prototype.render = function () {
        return [
            "\n        <aside class=\"left-panel\">\n            <nav class=\"left-panel-navs\">\n                {% for item in state.items %}\n                    <Link\n                        link={{item.link}}\n                        {% if props.router.pathname === item.link %}\n                            class=\"left-panel-navs__item current\"\n                        {% else %}\n                            class=\"left-panel-navs__item\"\n                        {% endif %}\n                    >\n                    <i class={{item.icon}} />\n                    </Link>\n                {% endfor %}\n            </nav>\n            {% if props.router.pathname === \"/menu\" || props.router.pathname === \"/profile\" %}\n              <LeftPanelMenu />\n            {% endif %}\n        </aside>\n        ",
        ];
    };
    return LeftPanel;
}(Component));
export { LeftPanel };
if (typeof templator !== 'undefined') {
    templator.registry.register('LeftPanel', LeftPanel);
}
