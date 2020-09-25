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
var ProfileStore = /** @class */ (function (_super) {
    __extends(ProfileStore, _super);
    function ProfileStore() {
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
                errors.push('Логин введен не верно');
            }
            if (!validate(_this.state.email, 'email')) {
                errors.push('Email введен не верно');
            }
            if (_this.state.password.length) {
                if (_this.state.password !== 'hi') {
                    errors.push('Старый пароль введен не верно');
                }
                if (_this.state.newPassword !== _this.state.rePassword) {
                    errors.push('Введенные пароли не совпадают');
                }
            }
            if (!errors.length) {
                alert('Форма успешно отправлена');
            }
            else {
                alert(errors.join('\n'));
            }
        };
        _this._displayName = 'profile';
        _this.state = {
            login: 'Maliken',
            email: 'maliken.webdev@gmail.com',
            password: '',
            newPassword: '',
            rePassword: '',
        };
        return _this;
    }
    return ProfileStore;
}(Store));
export { ProfileStore };
