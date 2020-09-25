var MNRequest = /** @class */ (function () {
    function MNRequest() {
        this.baseUrl = 'http://localhost:3000/';
    }
    MNRequest.prototype.request = function (url, properties) {
        return new Promise(function (resolve, reject) {
            var method = properties.method;
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var onRequestFailed = function () {
                console.error('Request failed');
                reject(xhr);
            };
            var onRequestSuccess = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    resolve(xhr);
                }
            };
            xhr.onabort = onRequestFailed;
            xhr.onerror = onRequestFailed;
            xhr.ontimeout = onRequestFailed;
            xhr.onreadystatechange = onRequestSuccess;
            xhr.send(properties ? JSON.stringify(properties) : '');
        });
    };
    return MNRequest;
}());
export { MNRequest };
