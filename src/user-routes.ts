import { v4 as uuidv4, validate } from 'uuid';
import Router from './router.ts';
import { sendJson } from './utils.ts';

export const router = new Router();

const users = [
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
