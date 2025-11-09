import { v4 as uuidv4 } from 'uuid';
import type { User } from './types.ts';

export const USERS: User[] = [
  { id: uuidv4(), username: 'Vitaliy', age: 22, hobbies: [] },
  { id: uuidv4(), username: 'Nadya', age: 28, hobbies: [] },
  { id: uuidv4(), username: 'Artem', age: 30, hobbies: [] },
  { id: uuidv4(), username: 'Vera', age: 18, hobbies: [] },
];
