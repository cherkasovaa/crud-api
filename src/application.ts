import EventEmitter from 'events';
import http from 'http';
// import Router from './router.ts';
// import Router from 'router.js';
import Router from './router.ts';
import { type Handler, HTTP_METHODS, type HttpMethods } from './types.ts';
import { sendJson } from './utils.ts';

type Server = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

export default class Application {
  public emitter: EventEmitter;
  public server: Server;
  public router: Router;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      if (!endpoint) {
        throw new Error('[ Endpoint does not exist ]');
      }

      Object.keys(endpoint).forEach((m: string) => {
        const method = m as HttpMethods;
        const handler: Handler | undefined = endpoint[method];

        if (!handler) {
          throw new Error(`[Handler is undefined]`);
        }

        this.emitter.on(this.createRouteMask(path, method), handler);
      });
    });
  }

  public listen(port: string, callback: () => void) {
    this.server.listen(port, callback);
  }

  private createServer(): Server {
    return http.createServer((req, res) => {
      const parsedUrl = req.url?.split('?')[0] || '';
      const method = req.method || HTTP_METHODS.GET;

      const isUserById = /^\/api\/users\/[\w-]+$/.test(parsedUrl);
      const route = isUserById ? '/api/users/:id' : parsedUrl;

      const emitted = this.emitter.emit(
        this.createRouteMask(route, method),
        req,
        res,
      );

      if (!emitted) {
        sendJson(res, 404, {
          message: `Cannot ${method} ${parsedUrl}. Route not found.`,
        });
      }
    });
  }

  private createRouteMask(route: string, method: string) {
    return `[${route}]:[${method}]`;
  }
}
