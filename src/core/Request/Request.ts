type HTTP_METHODS = 'GET' | 'POST' | 'DELETE' | 'PUT';

export type RequestBodyType = {
  [key: string]: any;
};

export type RequestPropertiesType = {
  method: HTTP_METHODS;
} & RequestBodyType;

export class MNRequest {
  protected baseUrl = 'http://localhost:3000/';

  protected request(
    url: string,
    properties: RequestPropertiesType
  ): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const { method } = properties;

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');

      const onRequestFailed = () => {
        console.error('Request failed');
        reject(xhr);
      };

      const onRequestSuccess = () => {
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
  }
}
