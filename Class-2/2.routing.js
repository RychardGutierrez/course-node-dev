const http = require('node:http');
const dittoJSON = require('./pokemon/ditto.json');

const desiredPort = process.env.PORT || 3000;

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(dittoJSON));

        default:
          res.status = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('Not found');
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', () => {
            const data = JSON.parse(body);
            // Call base data to save info

            res.writeHead(201, {
              // eslint-disable-next-line comma-dangle
              'content-Type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify(data));
          });
          break;
        }

        default:
          res.status = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('Not found');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listener on port: http://localhost:${desiredPort}/\n`);
});
