import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import type { User } from './types.ts';

export const sendJson = (
  res: ServerResponse,
  statusCode: number,
  data: unknown,
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const getUserId = (req: IncomingMessage): string => {
  const id = req.url?.split('/')[3] || '';

  return id;
};

export const checkUserId = (res: ServerResponse, id: string) => {
  if (!id) {
    sendJson(res, 400, { message: 'User ID is required' });

    return false;
  }

  if (!validate(id)) {
    sendJson(res, 400, {
      message: `User ID=${id} is invalid (not uuid)`,
    });

    return false;
  }

  return true;
};

export const getUserIdx = (
  users: User[],
  userId: string,
  res: ServerResponse,
): number => {
  const userIdx = users.findIndex((user) => user.id === userId);

  if (userIdx === -1) {
    sendJson(res, 404, { message: `User with ID=${userId} not found` });

    return -1;
  }

  return userIdx;
};
