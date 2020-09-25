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
import { DialogsListStore, } from '../../stores/dialogs.store.js';
var DialogsList = /** @class */ (function (_super) {
    __extends(DialogsList, _super);
    function DialogsList() {
        var _this = _super.call(this) || this;
        _this.onSelectDialog = function (dialogId) {
            _this.dialogsStore.selectDialog(dialogId);
        };
        _this.onSearchInputChange = function (e) {
            _this.dialogsStore.changeSearch(e.target.value);
        };
        _this.dialogsStore = DialogsListStore.getInstance();
        _this.dialogsStore.subscribe(_this);
        return _this;
    }
    DialogsList.prototype.render = function () {
        var _this = this;
        var dialogs = this.props.dialogs.items;
        var searchedDialogs = dialogs.filter(function (dialog) {
            return dialog.lastMessage
                .toLowerCase()
                .indexOf(_this.props.dialogs.search.toLowerCase()) >=
                0 ||
                dialog.userName
                    .toLowerCase()
                    .indexOf(_this.props.dialogs.search.toLowerCase()) >=
                    0;
        });
        return [
            "\n        <aside class=\"dialogs-panel\">\n            <div class=\"search-input-wrapper\">\n            <button class=\"bars-button\">\n                <i class=\"bars-button__icon fa fa-bars\"></i>\n            </button>\n            <SearchInput\n              onChange={{onSearchInputChange}}\n              value={{props.dialogs.search}}\n              />\n            </div>\n            <ul class=\"dialogs__list\">\n            {% if !props.dialogs.items.length && props.dialogs.loading %}\n                <LoadingIndicator />\n            {% endif %}\n            {% if props.dialogs.items.length %}\n                {% for dialog in dialogs %}\n                    <DialogListItem\n                      {% if props.dialogs.selectedDialogId === dialog.id %}\n                        selected={{true}}\n                      {% endif %}\n                      id={{dialog.id}}\n                      userName={{dialog.userName}}\n                      time={{dialog.time}}\n                      isMy={{dialog.isMy}}\n                      lastMessage={{dialog.lastMessage}}\n                      background={{dialog.background}}\n                      onClick={{onSelectDialog}}\n                      unreadCount={{dialog.unreadCount}}\n                    />\n                {% endfor %}\n            {% endif %}\n            </ul>\n        </aside>\n    ",
            {
                onSelectDialog: this.onSelectDialog,
                dialogs: searchedDialogs,
                onSearchInputChange: this.onSearchInputChange,
            },
        ];
    };
    return DialogsList;
}(Component));
export { DialogsList };
if (typeof templator !== 'undefined') {
    templator.registry.register('DialogsList', DialogsList);
}
