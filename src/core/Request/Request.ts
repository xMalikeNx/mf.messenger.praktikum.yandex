import { parseJSON } from './utils';

type HTTP_METHODS = 'GET' | 'POST' | 'DELETE' | 'PUT';

export type RequestBodyType = {
  [key: string]: any;
};

export type RequestPropertiesType = {
  method: HTTP_METHODS;
  contentType?: string;
  body?: Record<string, any>;
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
      if (!properties.contentType) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.withCredentials = true;

      const onRequestFailed = () => {
        console.error('Request failed');
        reject(xhr);
      };

      const onRequestSuccess = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 400) {
            const response = parseJSON(xhr.responseText);
            if (!response.isOk) {
              return reject({ code: xhr.status, message: xhr.responseText });
            }
            reject({ code: xhr.status, message: response.result.reason });
          }
          resolve(xhr);
        }
      };

      xhr.onabort = onRequestFailed;
      xhr.onerror = onRequestFailed;
      xhr.ontimeout = onRequestFailed;
      xhr.onreadystatechange = onRequestSuccess;

      if (properties.contentType && properties.body) {
        const formData = new FormData();

        Object.keys(properties.body).forEach((key) => {
          formData.append(key, (properties.body as any)[key]);
        });

        xhr.send(formData);
      } else {
        xhr.send(JSON.stringify(properties.body));
      }
    });
  }
}
