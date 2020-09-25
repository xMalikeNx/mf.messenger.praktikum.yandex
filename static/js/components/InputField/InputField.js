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
var InputField = /** @class */ (function (_super) {
    __extends(InputField, _super);
    function InputField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            console.log(_this.props);
            if (typeof _this.props.onFieldChange === 'function') {
                _this.props.onFieldChange(e);
            }
        };
        return _this;
    }
    InputField.prototype.render = function () {
        var value = this.props.value || '';
        var placeholder = this.props.placeholder || '';
        return [
            "\n        <div class=\"input-block\">\n            <label class=\"input-block__label\" for={{props.id}}>{{props.title}}</label>\n            <input\n                class=\"input-block__field\"\n                name={{props.name}}\n                id=\"{{props.id}}\"\n                type=\"{{props.type}}\"\n                placeholder=\"{{placeholder}}\"\n                value=\"{{value}}\"\n                onChange={{onChange}}\n                />\n        </div>\n        ",
            { value: value, onChange: this.onChange, placeholder: placeholder },
        ];
    };
    return InputField;
}(Component));
export { InputField };
if (typeof templator !== 'undefined') {
    templator.registry.register('InputField', InputField);
}
