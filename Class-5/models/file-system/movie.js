import { randomUUID } from 'node:crypto';

import { readJSON } from '../utils.js';

const movies = readJSON('./movies.json');

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const moviesFilter = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return moviesFilter;
    }
    return movies;
  }

  static async getById({ id }) {
    console.log(id, 'id');
    const movie = movies.find((movie) => movie.id === id);
    console.log(movie);
    return movie;
  }

  static async create(movie) {
    const newMovie = {
      id: randomUUID().toString(),
      ...movie,
    };

    movies.push(newMovie);
    return newMovie;
  }

  static async update({ id, movie }) {
    const indexMovie = movies.findIndex((movie) => movie.id == id);

    if (indexMovie === -1) {
      return null;
    }

    const updateMovie = {
      ...movies[indexMovie],
      ...movie,
    };

    movies[indexMovie] = updateMovie;

    return updateMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    console.log(movieIndex);
    if (movieIndex === -1) {
      return false;
    }

    movies.splice(movieIndex, 1);
    return true;
  }
}
