import { v4 as uuidv4, validate } from 'uuid';
import Router from './router.ts';
import type { User } from './types.ts';
import { sendJson } from './utils.ts';

export const router = new Router();

const users: User[] = [
  { id: uuidv4(), username: 'Vitaliy', age: 22, hobbies: [] },
  { id: uuidv4(), username: 'Nadya', age: 28, hobbies: [] },
  { id: uuidv4(), username: 'Artem', age: 30, hobbies: [] },
  { id: uuidv4(), username: 'Vera', age: 18, hobbies: [] },
];

router.get('/api/users', (req, res) => {
  sendJson(res, 200, users);
});

router.get('/api/users/:id', (req, res) => {
  const id = req.url?.split('/')[3] || '';

  if (!id) {
    return sendJson(res, 400, { message: 'User ID is required' });
  }

  if (!validate(id)) {
    return sendJson(res, 400, { message: 'User ID is invalid (not uuid)' });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return sendJson(res, 404, { message: `User with ID=${id} not found` });
  }

  sendJson(res, 200, user);
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

      users.push(user);

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
      const userId = req.url?.split('/')[3] || '';

      if (!userId) {
        return sendJson(res, 400, { message: 'User ID is required' });
      }

      if (!validate(userId)) {
        return sendJson(res, 400, {
          message: `User ID=${userId} is invalid (not uuid)`,
        });
      }

      const userIdx = users.findIndex((user) => user.id === userId);

      if (userIdx === -1) {
        return sendJson(res, 404, {
          message: `User with ID=${userId} not found`,
        });
      }

      const userRequest: Partial<Omit<User, 'id'>> = JSON.parse(body);

      const { username, age, hobbies } = userRequest;

      const oldDataUser = users[userIdx];

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

      users[userIdx] = updatedUser;

      sendJson(res, 200, updatedUser);
    } catch (err) {
      return sendJson(res, 400, {
        message: `'Invalid request body: not a valid JSON`,
      });
    }
  });
});
