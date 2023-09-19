const fs = require('node:fs');
const http = require('node:http');

const desiredPort = process.env.PORT || 3000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;
    return res.end('Hello World!');
  }

  if (req.url === '/about') {
    res.statusCode = 200;
    return res.end('<h1>About page</h1>');
  }

  if (req.url === '/img') {
    fs.readFile('./img/test.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>Something went wrong</h1>');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpeg');
      res.write(data);
      res.end(data);
    });
    return;
  }

  res.status = 404;
  return res.end('Not found');
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listener on port: http://localhost:${desiredPort}/\n`);
});

// node --watch 1-http.js

// Status Code
/**
 * 100 - 199: informational responses
 * 200 - 299: success responses    -> 200 ok
 * 300 - 399: redirect responses   -> 301 moved permanently
 * 400 - 499: client error responses -> 400 bad request, 404 not found
 * 500 - 599: server error responses -> 500 internal server error
 */
