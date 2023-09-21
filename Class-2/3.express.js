const express = require('express');
const app = express();

const dittoJSON = require('./pokemon/ditto.json');

// to diable the X-Powered-By: Express
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

// Midalware
// app.use((req, res, next) => {
//   console.log('Request received');
//   if (
//     req.method !== 'POST' ||
//     req.headers['content-type'] !== 'application/json'
//   ) {
//     return next();
//   }
//   let body = '';
//   req.on('data', (chunk) => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     // res.status(201).json(data);
//     // mutar la request and add this data in the req.body

//     req.body = data;
//     return next();
//   });
// });

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World!</h1>');
});

app.get('/json', (req, res) => {
  res.status(200).json({ test: 'test' });
});

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

// default path for 404
app.use((req, res) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
