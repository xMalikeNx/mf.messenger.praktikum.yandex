import { MNRequest, RequestBodyType } from '../core/Request/Request.js';
import { parseQueryParams } from './parseQueryParams.js';

export class Api extends MNRequest {
  public get(url: string, params?: RequestBodyType) {
    let requestUrl = url;
    if (params?.body) {
      requestUrl = `${requestUrl}${parseQueryParams(params.body)}`;
    }

    return this.request(`${this.baseUrl}${requestUrl}`, {
      method: 'GET',
      ...params,
    });
  }

  public post(url: string, params?: RequestBodyType) {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'POST',
      ...params,
    });
  }

  public put(url: string, params?: RequestBodyType) {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'PUT',
      ...params,
    });
  }

  public delete(url: string, params?: RequestBodyType) {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      ...params,
    });
  }
}
