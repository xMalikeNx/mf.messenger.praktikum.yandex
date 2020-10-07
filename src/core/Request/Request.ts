type HTTP_METHODS = 'GET' | 'POST' | 'DELETE' | 'PUT';

export type RequestBodyType = {
  [key: string]: any;
};

export type RequestPropertiesType = {
  method: HTTP_METHODS;
} & RequestBodyType;

export class MNRequest {
  protected baseUrl = 'https://ya-praktikum.tech/api/v2/';

  protected request(
    url: string,
    properties: RequestPropertiesType
  ): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const { method } = properties;

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;

      const onRequestFailed = () => {
        console.error('Request failed');
        reject(xhr);
      };

      const onRequestSuccess = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 400) {
            const responseData = JSON.parse(xhr.responseText);
            reject({ code: xhr.status, message: responseData.reason });
          }
          resolve(xhr);
        }
      };

      xhr.onabort = onRequestFailed;
      xhr.onerror = onRequestFailed;
      xhr.ontimeout = onRequestFailed;
      xhr.onreadystatechange = onRequestSuccess;

      xhr.send(properties.body ? JSON.stringify(properties.body) : '');
    });
  }
}
