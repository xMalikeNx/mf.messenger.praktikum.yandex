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
var SearchInput = /** @class */ (function (_super) {
    __extends(SearchInput, _super);
    function SearchInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onItemChange = function (e) {
            if (typeof _this.props.onChange === 'function') {
                _this.props.onChange(e);
            }
        };
        return _this;
    }
    SearchInput.prototype.render = function () {
        var value = this.props.value || '';
        return [
            "\n        <div class=\"search-input\">\n            <input\n            class=\"search-input__field\"\n            type=\"text\"\n            placeholder=\"\u041F\u043E\u0438\u0441\u043A: Enter\"\n            onChange={{onItemChange}}\n            value={{value}}\n            />\n        </div>\n      ",
            { onItemChange: this.onItemChange, value: value },
        ];
    };
    return SearchInput;
}(Component));
export { SearchInput };
if (typeof templator !== 'undefined') {
    templator.registry.register('SearchInput', SearchInput);
}
