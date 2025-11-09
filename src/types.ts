import { IncomingMessage, ServerResponse } from 'http';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HttpMethods = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export interface Endpoints {
  [path: string]: {
    [method in HttpMethods]?: Handler;
  };
}

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
