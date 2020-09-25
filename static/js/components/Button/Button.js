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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.props = {
            className: _this.props.className || '',
            text: _this.props.text || 'Button',
        };
        return _this;
    }
    Button.prototype.handleClick = function () {
        this.setState({
            name: !this.state.name,
        });
    };
    Button.prototype.timeout = function () {
        this.setState({
            loading: false,
        });
    };
    Button.prototype.render = function () {
        return [
            "\n      <button class=\"btn {{props.className}}\" onClick={{props.onClick}}>\n          {{props.text}}\n      </button>\n    ",
        ];
    };
    return Button;
}(Component));
export { Button };
if (typeof templator !== 'undefined') {
    templator.registry.register('Button', Button);
}
