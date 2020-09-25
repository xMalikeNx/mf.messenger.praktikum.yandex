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
import { Store } from '../core/Store.js';
import { validate } from '../utils/validate.js';
var RegistrationStore = /** @class */ (function (_super) {
    __extends(RegistrationStore, _super);
    function RegistrationStore() {
        var _this = _super.call(this) || this;
        _this.onFieldChange = function (e) {
            var _a;
            var _b = e.target, name = _b.name, value = _b.value;
            _this.updateState((_a = {},
                _a[name] = value,
                _a));
        };
        _this.onFormSubmit = function () {
            var errors = [];
            if (!validate(_this.state.login)) {
                errors.push('Логин содержит недопустимые символы');
            }
            if (_this.state.password !== _this.state.rePassword) {
                errors.push('Пароли не совпадают');
            }
            if (!validate(_this.state.password)) {
                errors.push('Пароль содержит недопустимые символы');
            }
            if (!validate(_this.state.rePassword)) {
                errors.push('Подтверждение пароля содержит недопустимые символы');
            }
            if (!errors.length) {
                alert('Форма успешно отправлена');
            }
            else {
                alert(errors.join('\n'));
            }
        };
        _this._displayName = 'registration';
        _this.state = {
            login: '',
            password: '',
            rePassword: '',
        };
        return _this;
    }
    return RegistrationStore;
}(Store));
export { RegistrationStore };
