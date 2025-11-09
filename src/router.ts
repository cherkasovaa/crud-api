import type { Endpoints, Handler, HttpMethods } from './types';
import { HTTP_METHODS } from './types';

export default class Router {
  public endpoints: Endpoints = {};

  constructor() {}

  private request(method: HttpMethods, path: string, handler: Handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoints = this.endpoints[path];

    if (endpoints[method]) {
      throw new Error(`[${method} by the path ${path} already exists]`);
    }

    endpoints[method] = handler;
  }

  public get(path: string, handler: Handler) {
    this.request(HTTP_METHODS.GET, path, handler);
  }

  public post(path: string, handler: Handler) {
    this.request(HTTP_METHODS.POST, path, handler);
  }

  public put(path: string, handler: Handler) {
    this.request(HTTP_METHODS.PUT, path, handler);
  }

  public delete(path: string, handler: Handler) {
    this.request(HTTP_METHODS.DELETE, path, handler);
  }
}
