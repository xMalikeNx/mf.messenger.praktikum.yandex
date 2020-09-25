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
var LoginStore = /** @class */ (function (_super) {
    __extends(LoginStore, _super);
    function LoginStore() {
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
            if (_this.state.login !== 'admin' || _this.state.password !== 'hello') {
                errors.push('Логин или пароль введены не верно');
            }
            if (!errors.length) {
                alert('Форма успешно отправлена');
            }
            else {
                alert(errors.join('\n'));
            }
        };
        _this._displayName = 'login';
        _this.state = {
            login: '',
            password: '',
        };
        return _this;
    }
    return LoginStore;
}(Store));
export { LoginStore };
