import express, { json } from 'express';

import routerMovies from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Midalware
app.use(json());
app.disable('x-powered-by');

//cors
app.use(corsMiddleware());

app.use('/movies', routerMovies);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}, http://localhost:${PORT}/`);
});
