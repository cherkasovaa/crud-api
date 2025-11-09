# CRUD API
![Static Badge](https://img.shields.io/badge/status-done-green)
![Node.js](https://img.shields.io/badge/Node.js-24.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

Simple CRUD API using in-memory database underneath.

## Features

- **Full CRUD Functionality**: create, read, update, and delete users.
- **In-Memory Database**: no external database required.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version `24.10.0` or higher.

### Cloning the repository

To start working on the project, clone the repository to your local machine.

```bash
git clone https://github.com/cherkasovaa/crud-api.git
```

After cloning, checkout to the dev branch

```bash
git checkout develop
```

Navigate to the project directory:

```bash
cd crud-api
```

### Installing dependencies

To start working on the project, install all dependencies:

```bash
npm install
```

### Development mode

During development, use the development mode. To start the dev server, run:

```bash
npm run start:dev
```

### Set up environment variables
Create a `.env` file by copying the example file. The default port is `5000`

```bash
cp .env.example .env
```

### Building the project

To build the project, run: `npm run start:prod`


### Testing

Run tests with the command: `npm run test`
Run tests with detailed output: `npm run test:verbose`

### Linting and formatting

- Check code with ESLint: `npm run lint`
- Format code with Prettier: `npm run format`

## API Endpoints

It is recommended to use an API client like [Postman](https://www.postman.com/), [Thunder Client (VSCode extension)](www.thunderclient.com) or [Insomnia](https://insomnia.rest/) to interact with the endpoints.

**Base URL:** `http://localhost:5000`

### GET
Get all users

```bash
http://localhost:5000/api/users
```

Get user by ID

```bash
http://localhost:5000/api/users/{uuid}
```

### POST
Create a new user

```bash
  http://localhost:5000/api/users/
```

### POST
Update user

```bash
  http://localhost:5000/api/users/{uuid}
```

### DELETE
Delete user

```bash
  http://localhost:5000/api/users/{uuid}
```

### Creating a User (`POST /api/users`)

**Request Body Example:**

```json
{
  "username": "Pavel",
  "age": 30,
  "hobbies": ["learning", "coding"]
}