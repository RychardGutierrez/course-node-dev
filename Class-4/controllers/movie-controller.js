import { validaMovie, validParcialMovie } from '../schemas/movies.js';

import { MovieModel } from '../models/database/movie.js';

export class MovieController {
  static notFound = async (req, res) => {
    return res.status(404).json({ message: 'Movie not found' });
  };

  static getAll = async (req, res) => {
    try {
      const { genre } = req.query;

      const result = await MovieModel.getAll({ genre });

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });

    if (!movie) {
      return this.notFound(req, res);
    }

    return res.json(movie);
  };

  static create = async (req, res) => {
    try {
      const result = validaMovie(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newMovie = await MovieModel.create(result.data);
      return res.status(201).json(newMovie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static updated = async (req, res) => {
    const { id } = req.params;
    const result = validParcialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updateMovie = await MovieModel.update({ id, movie: result.data });

    if (updateMovie === null) {
      return this.notFound(req, res);
    }

    return res.status(201).json(updateMovie);
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const isDeleted = await MovieModel.delete({ id });

    if (!isDeleted) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json({ message: 'Movie deleted' });
  };
}
