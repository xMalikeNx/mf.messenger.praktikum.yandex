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
import { ChatStore } from '../../stores/chat.store.js';
var ChatPanel = /** @class */ (function (_super) {
    __extends(ChatPanel, _super);
    function ChatPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.chatStore = ChatStore.getInstance();
        _this.chatStore.subscribe(_this);
        return _this;
    }
    ChatPanel.prototype.componentDidMount = function () {
        this.chatStore.fetchMessagesFromDialog(parseInt(this.props.selectedChatId));
    };
    ChatPanel.prototype.render = function () {
        return [
            "\n        <main class=\"chat-panel\">\n            <header class=\"top-bar\">\n            <button class=\"back-button\">\n                <img\n                class=\"back-button__icon\"\n                src=\"/img/icons/back.svg\"\n                alt=\"back\"\n                />\n            </button>\n            <div class=\"top-bar-info\">\n                <div class=\"avatar\">\n                \u041C\n                </div>\n                <div class=\"top-bar-info__data\">\n                <div class=\"top-bar-info__username\">\n                    \u041C\u0443\u0440\n                </div>\n                <time class=\"top-bar-info__lastvisit\">\n                    \u0431\u044B\u043B \u0432 \u0441\u0435\u0442\u0438 20 \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434\n                </time>\n                </div>\n            </div>\n            <div class=\"settings-wrap\">\n                <div class=\"dots-icon\">\n                <img\n                    class=\"dots-icon__img\"\n                    src=\"/img/icons/dots.svg\"\n                    alt=\"dots\"\n                />\n                </div>\n            </div>\n            </header>\n            <div class=\"chat\">\n            {% if props.chat.loading %}\n                <LoadingIndicator />\n            {% else %}\n                <time class=\"message-time\">\n                    29 \u0430\u0432\u0433\u0443\u0441\u0442\u0430\n                </time>\n                {% for message in props.chat.messages %}\n                    <Message\n                        message={{message.message}}\n                        isMy={{message.isMy}}\n                        time={{message.time}}\n                    />\n                {% endfor %}\n            {% endif %}\n            </div>\n            <footer class=\"message-bar\">\n            <div class=\"message-bar__attach\">\n                <img src=\"/img/icons/attach.svg\" alt=\"attach\" />\n            </div>\n            <div class=\"message-bar__input-wrap\">\n                <input\n                class=\"message-bar__input\"\n                placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\"\n                type=\"text\"\n                />\n                <div class=\"message-bar__send\">\n                <img src=\"/img/icons/send.svg\" alt=\"send\" />\n                </div>\n            </div>\n            </footer>\n        </main>\n        ",
        ];
    };
    return ChatPanel;
}(Component));
export { ChatPanel };
if (typeof templator !== 'undefined') {
    templator.registry.register('ChatPanel', ChatPanel);
}
