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
import { getFirstLitera } from '../../utils/getFirstLitera.js';
var DialogListItem = /** @class */ (function (_super) {
    __extends(DialogListItem, _super);
    function DialogListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSelectDialog = function () {
            var _a = _this.props, onClick = _a.onClick, id = _a.id;
            if (typeof onClick === 'function') {
                onClick(typeof id === 'number' ? id : parseInt(id));
            }
        };
        return _this;
    }
    DialogListItem.prototype.render = function () {
        var firstLitera = getFirstLitera(this.props.userName);
        return [
            "\n      <li onClick={{onSelectDialog}}>\n        <div \n            {% if props.selected %}\n            class=\"dialog-item current\"\n            {% else %}\n            class=\"dialog-item\"\n            {% endif %}\n        >\n        <Avatar background=\"{{props.background}}\" title=\"{{firstLitera}}\" />\n        <div class=\"dialog-item__info\">\n            <div class=\"dialog-item__username\">\n            {{props.userName}}\n            </div>\n            <div class=\"dialog-item__message\">\n            {{props.lastMessage}}\n            </div>\n            </div>\n                <div class=\"dialog-item__status-block\">\n                {% if props.isMy %}\n                    <span class=\"dialog-item__check\">\n                    <img src=\"/img/icons/check.svg\" alt=\"check\" />\n                    </span>\n                {% else %}\n                    <div class=\"dialog-item__indicator\">\n                    {{props.unreadCount}}\n                    </div>\n                {% endif %}    \n                    <time class=\"dialog-item__time\">\n                        {{props.time}}\n                    </time>\n                    </div>\n                </div>\n            </li>\n      ",
            { firstLitera: firstLitera, onSelectDialog: this.onSelectDialog },
        ];
    };
    return DialogListItem;
}(Component));
export { DialogListItem };
if (typeof templator !== 'undefined') {
    templator.registry.register('DialogListItem', DialogListItem);
}
