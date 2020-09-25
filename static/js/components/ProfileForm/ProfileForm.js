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
import { ProfileStore } from '../../stores/profile.store.js';
var ProfileForm = /** @class */ (function (_super) {
    __extends(ProfileForm, _super);
    function ProfileForm() {
        var _this = _super.call(this) || this;
        _this.profileStore = ProfileStore.getInstance();
        _this.profileStore.subscribe(_this);
        return _this;
    }
    ProfileForm.prototype.render = function () {
        return [
            "\n        <div>\n            <h2 class=\"content-view__title\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F</h2>\n            <div class=\"content-view__user\">\n                <div class=\"avatar content-view__avatar\">\n                M\n                </div>\n                <div class=\"content-view__user-info\">\n                <div class=\"content-view__user-name\">{{props.profile.login}}</div>\n                <div class=\"content-view__user-email\">{{props.profile.email}}</div>\n                </div>\n            </div>\n            <div class=\"form\">\n                <InputField\n                    value=\"{{props.profile.login}}\"\n                    name=\"login\"\n                    id=\"login\"\n                    type=\"text\"\n                    title=\"\u041B\u043E\u0433\u0438\u043D\"\n                    onFieldChange={{onFieldChange}}\n                />\n                <InputField\n                    value=\"{{props.profile.email}}\"\n                    name=\"email\"\n                    id=\"email\"\n                    type=\"email\"\n                    title=\"Email\"\n                    onFieldChange={{onFieldChange}}\n                />\n                <InputField\n                    value=\"{{props.profile.password}}\"\n                    name=\"password\"\n                    id=\"password\"\n                    type=\"password\"\n                    title=\"\u0421\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C\"\n                    onFieldChange={{onFieldChange}}\n                />\n                <InputField\n                    value=\"{{props.profile.newPassword}}\"\n                    name=\"newPassword\"\n                    id=\"newPassword\"\n                    type=\"password\"\n                    title=\"\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C\"\n                    onFieldChange={{onFieldChange}}\n                />\n                <InputField\n                    value=\"{{props.profile.rePassword}}\"\n                    name=\"rePassword\"\n                    id=\"rePassword\"\n                    type=\"password\"\n                    title=\"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F\"\n                    onFieldChange={{onFieldChange}}\n                />\n                </div>\n                <div class=\"text-right\">\n                <button onClick={{onSubmit}} class=\"button\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n                </div>\n            </div>\n        </div>\n        ",
            {
                onFieldChange: this.profileStore.onFieldChange,
                onSubmit: this.profileStore.onFormSubmit,
            },
        ];
    };
    return ProfileForm;
}(Component));
export { ProfileForm };
if (typeof templator !== 'undefined') {
    templator.registry.register('ProfileForm', ProfileForm);
}
