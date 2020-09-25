export var getFirstLitera = function (word) {
    return word
        .split(' ')
        .reduce(function (res, current) { return (res += current.slice(0, 1)); }, '');
};
