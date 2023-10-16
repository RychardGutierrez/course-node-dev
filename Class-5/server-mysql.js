import { createApp } from './app.js';
import { MovieModel } from './models/mysqldb/movie.js';

createApp({ movieModel: MovieModel });
