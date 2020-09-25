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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { MNRequest } from '../core/Request/Request.js';
import { parseQueryParams } from './parseQueryParams.js';
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Api.prototype.get = function (url, params) {
        var requestUrl = url;
        if (params === null || params === void 0 ? void 0 : params.body) {
            requestUrl = "" + requestUrl + parseQueryParams(params.body);
        }
        return this.request("" + this.baseUrl + requestUrl, __assign({ method: 'GET' }, params));
    };
    Api.prototype.post = function (url, params) {
        return this.request("" + this.baseUrl + url, __assign({ method: 'POST' }, params));
    };
    Api.prototype.put = function (url, params) {
        return this.request("" + this.baseUrl + url, __assign({ method: 'PUT' }, params));
    };
    Api.prototype.delete = function (url, params) {
        return this.request("" + this.baseUrl + url, __assign({ method: 'DELETE' }, params));
    };
    return Api;
}(MNRequest));
export { Api };
