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
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        return [
            "\n            <div \n                {% if !props.isMy %}\n                    class=\"message\"\n                {% else %}\n                class=\"message message--me\"\n                {% endif %}\n            >\n                <article class=\"message__content\">\n                <p>{{props.message}}</p>\n                <p />\n                </article>\n                <div class=\"message__status\">\n                    <time class=\"message__time\">\n                    {{props.time}}\n                    </time>\n                    {% if props.isMy %}\n                        <div class=\"message__indicator\">\n                            <img src=\"/img/icons/check.svg\" alt=\"check\" />\n                        </div>\n                    {% endif %}\n                    </div>\n            </div>\n        ",
        ];
    };
    return Message;
}(Component));
export { Message };
if (typeof templator !== 'undefined') {
    templator.registry.register('Message', Message);
}
