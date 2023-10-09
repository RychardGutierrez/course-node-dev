const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');
const movies = require('./movies.json');
const { validaMovie, validParcialMovie } = require('./schemas/movies');

const app = express();
const PORT = process.env.PORT || 3000;
const ACCEPTED_ORIGINS = ['http://127.0.0.1:5500', 'http://localhost:5500'];
// Midalware
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

//cors
const corsOptions = {
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// methods normals: GET/ HEAD /POST
// methods complex: PUT/ PATCH / DELETE

app.get('/movies', (req, res) => {
  // const origin = req.headers.origin;
  // if (ACCEPTED_ORIGINS.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  const { genre } = req.query;
  if (genre) {
    const movie = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(movie);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  //path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(movie);
});

// Post
app.post('/movies', (req, res) => {
  const result = validaMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID().toString(),
    ...result.data,
  };

  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const result = validParcialMovie(req.body);
  console.log(result);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const indexMovie = movies.findIndex((movie) => movie.id == id);

  if (indexMovie === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[indexMovie],
    ...result.data,
  };

  movies[indexMovie] = updateMovie;

  return res.status(201).json(updateMovie);
});

// CORS PRE-Flight
// OPTIONS

// app.options('/movies/:id', (req, res) => {
//   const origin = req.headers.origin;
//   if (ACCEPTED_ORIGINS.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     return res.send(200);
//   }

//   return res.send(412);
// });
app.delete('/movies/:id', (req, res) => {
  // const origin = req.headers.origin;
  // if (ACCEPTED_ORIGINS.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);

  return res.status(204).json({ message: 'Movie deleted' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}, http://localhost:${PORT}/`);
});
