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
import { Component } from '../../core/Component';
var ErrorPage = /** @class */ (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorPage.prototype.render = function () {
        return [
            "\n        <div class=\"app gradient-page\">\n            <div class=\"error-panel\">\n                <div class=\"error-panel__code\">{{props.code}}</div>\n                <div class=\"error-panel__message\">{{props.title}}</div>\n            </div>\n        </div>\n        ",
        ];
    };
    return ErrorPage;
}(Component));
export { ErrorPage };
if (typeof templator !== 'undefined') {
    templator.registry.register('ErrorPage', ErrorPage);
}
