export var parseJSON = function (str) {
    try {
        return {
            isOk: true,
            result: JSON.parse(str),
        };
    }
    catch (err) {
        return {
            isOk: false,
        };
    }
};
