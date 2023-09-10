const http = require('node:http');
const { findAvailablePort } = require('./10-free-port.js');

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.end('Hello World');
});

// server.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// server.listen(0, () => {
//   console.log(
//     `Server is listening on port http://localhost:${server.address().port}`
//   );
// });

findAvailablePort(3000).then((port) => {
  server.listen(port, () => {
    console.log(
      `Server is listening on port http://localhost:${server.address().port}`
    );
  });
});
