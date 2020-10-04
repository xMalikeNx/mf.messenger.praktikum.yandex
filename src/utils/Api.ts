import { MNRequest, RequestBodyType } from '../core/Request/Request';
import { parseQueryParams } from './parseQueryParams';

export class Api extends MNRequest {
  constructor() {
    super();
  }
  public get(url: string, params?: RequestBodyType): Promise<XMLHttpRequest> {
    let requestUrl = url;
    if (params?.body) {
      requestUrl = `${requestUrl}${parseQueryParams(params.body)}`;
    }

    return this.request(`${this.baseUrl}${requestUrl}`, {
      method: 'GET',
      ...params,
    });
  }

  public post(url: string, params?: RequestBodyType): Promise<XMLHttpRequest> {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'POST',
      ...params,
    });
  }

  public put(url: string, params?: RequestBodyType): Promise<XMLHttpRequest> {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'PUT',
      ...params,
    });
  }

  public delete(url: string, params?: RequestBodyType): Promise<XMLHttpRequest> {
    return this.request(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      ...params,
    });
  }
}
