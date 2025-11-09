import { v4 as uuidv4 } from 'uuid';
import { USERS } from './database.ts';
import Router from './router.ts';
import type { User } from './types.ts';
import { checkUserId, getUserId, getUserIdx, sendJson } from './utils.ts';

export const router = new Router();

router.get('/api/users', (req, res) => {
  sendJson(res, 200, USERS);
});

router.get('/api/users/:id', (req, res) => {
  const userId = getUserId(req);

  if (!checkUserId(res, userId)) return;

  const userIdx = getUserIdx(USERS, userId, res);

  if (userIdx === -1) return;

  sendJson(res, 200, USERS[userIdx]);
});

router.post('/api/users', (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userRequest: Omit<User, 'id'> = JSON.parse(body);

      const { username, age, hobbies } = userRequest;

      if (!username || !age || !hobbies) {
        return sendJson(res, 400, {
          message: `Request body does not contains required fields (username, age, hobbies)`,
        });
      }

      if (
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        !Array.isArray(hobbies)
      ) {
        return sendJson(res, 400, {
          message: `Invalid data types for fields. The username must be a string, age must be a number, hobbies must be an array of strings)`,
        });
      }

      const user: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      USERS.push(user);

      sendJson(res, 201, user);
    } catch (err) {
      return sendJson(res, 400, {
        message: `'Invalid request body: not a valid JSON`,
      });
    }
  });
});

router.put('/api/users/:id', (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userId = getUserId(req);

      if (!checkUserId(res, userId)) return;

      const userIdx = getUserIdx(USERS, userId, res);

      if (userIdx === -1) return;

      const userRequest: Partial<Omit<User, 'id'>> = JSON.parse(body);

      const { username, age, hobbies } = userRequest;

      const oldDataUser = USERS[userIdx];

      if (!oldDataUser) {
        return sendJson(res, 404, {
          message: `User with ID=${userId} not found`,
        });
      }

      const updatedUser = {
        id: userId,
        username: username || oldDataUser.username,
        age: age || oldDataUser.age,
        hobbies: hobbies || oldDataUser.hobbies,
      };

      if (
        typeof updatedUser.username !== 'string' ||
        typeof updatedUser.age !== 'number' ||
        !Array.isArray(updatedUser.hobbies)
      ) {
        return sendJson(res, 400, {
          message: `Invalid data types for fields. The username must be a string, age must be a number, hobbies must be an array of strings)`,
        });
      }

      USERS[userIdx] = updatedUser;

      sendJson(res, 200, updatedUser);
    } catch (err) {
      return sendJson(res, 400, {
        message: `'Invalid request body: not a valid JSON`,
      });
    }
  });
});

router.delete('/api/users/:id', (req, res) => {
  const userId = getUserId(req);

  if (!checkUserId(res, userId)) return;

  const userIdx = getUserIdx(USERS, userId, res);

  if (userIdx === -1) return;

  USERS.splice(userIdx, 1);

  res.writeHead(204);
  res.end();
});
