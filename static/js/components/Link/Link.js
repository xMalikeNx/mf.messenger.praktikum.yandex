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
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link(props) {
        var _this = _super.call(this, props) || this;
        _this.props = {
            link: _this.props.link || '/chat',
            text: _this.props.text || '',
            className: _this.props.className || '',
        };
        var router = Router.getInstance();
        _this._router = router;
        _this._router.subscribe(_this);
        return _this;
    }
    Link.prototype.onChangeRoute = function () {
        var link = this.props.link;
        if (typeof link === 'string') {
            this._router.go(link);
        }
    };
    Link.prototype.render = function () {
        var _a;
        var className = "btn-link " + ((_a = this.props.className) !== null && _a !== void 0 ? _a : '');
        return [
            "\n        <button class={{className}} onClick={{onChangeRoute}}>\n            {{props.text}}\n        </button>\n      ",
            { onChangeRoute: this.onChangeRoute.bind(this), className: className },
        ];
    };
    return Link;
}(Component));
export { Link };
if (typeof templator !== 'undefined') {
    templator.registry.register('Link', Link);
}
