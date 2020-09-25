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
import { LoginStore } from '../../stores/login.store.js';
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super.call(this) || this;
        _this.loginStore = LoginStore.getInstance();
        _this.loginStore.subscribe(_this);
        return _this;
    }
    LoginForm.prototype.render = function () {
        return [
            "\n        <div class=\"form-wrap\">\n        <div class=\"form\">\n          <h4 class=\"form__title\">\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</h4>\n          <InputField\n            name=\"login\"\n            id=\"login\"\n            value=\"{{props.login.login}}\"\n            type=\"text\"\n            title=\"\u041B\u043E\u0433\u0438\u043D\"\n            onFieldChange={{onFieldChange}}\n          />\n          <InputField\n            name=\"password\"\n            id=\"password\"\n            value=\"{{props.login.password}}\"\n            onFieldChange={{onFieldChange}}\n            type=\"password\"\n            title=\"\u041F\u0430\u0440\u043E\u043B\u044C\"\n          />\n          <div class=\"form__button\">\n            <Button className=\"button\" text=\"\u0412\u043E\u0439\u0442\u0438\" onClick={{onSubmit}} />\n          </div>\n          <div class=\"form__alt\">\n            \u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?<br />\n            <Link text=\"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F\" link=\"/registration\" />\n          </div>\n        </div>\n      </div>\n        ",
            {
                onSubmit: this.loginStore.onFormSubmit,
                onFieldChange: this.loginStore.onFieldChange,
            },
        ];
    };
    return LoginForm;
}(Component));
export { LoginForm };
if (typeof templator !== 'undefined') {
    templator.registry.register('LoginForm', LoginForm);
}
