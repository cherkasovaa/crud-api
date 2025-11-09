import 'dotenv/config';
import http from 'http';
import process from 'process';

const PORT = process.env.PORT || '5000';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json',
  });

  if (req.url === '/api/users') {
    return res.end(JSON.stringify([{ id: 1, name: 'Alina' }]));
  }

  res.end(req.url);
});

server.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
