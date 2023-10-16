import { validaMovie, validParcialMovie } from '../schemas/movies.js';

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }
  notFound = async (req, res) => {
    return res.status(404).json({ message: 'Movie not found' });
  };

  getAll = async (req, res) => {
    try {
      const { genre } = req.query;

      const result = await this.movieModel.getAll({ genre });

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id });

    if (!movie) {
      return this.notFound(req, res);
    }

    return res.json(movie);
  };

  create = async (req, res) => {
    try {
      const result = validaMovie(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newMovie = await this.movieModel.create(result.data);
      return res.status(201).json(newMovie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updated = async (req, res) => {
    const { id } = req.params;
    const result = validParcialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updateMovie = await this.movieModel.update({
      id,
      movie: result.data,
    });

    if (updateMovie === null) {
      return this.notFound(req, res);
    }

    return res.status(201).json(updateMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const isDeleted = await this.movieModel.delete({ id });

    if (!isDeleted) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json({ message: 'Movie deleted' });
  };
}
