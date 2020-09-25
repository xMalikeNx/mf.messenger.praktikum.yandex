export var parseQueryParams = function (input) {
    return Object.keys(input).reduce(function (res, key, idx) {
        var prefix = '&';
        if (idx === 0) {
            prefix = '?';
        }
        return "" + res + prefix + key + "=" + JSON.stringify(input[key]);
    }, '');
};
