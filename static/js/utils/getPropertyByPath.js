export function getPropertyByPath(obj, path) {
    if (!path) {
        return obj;
    }
    var current = obj;
    for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
        var part = _a[_i];
        current = current[part];
        if (!current) {
            return undefined;
        }
    }
    return current;
}
