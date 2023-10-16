import { Router } from 'express';

import { MovieController } from '../controllers/movie-controller.js';

export const createMovieRouter = ({ movieModel }) => {
  const router = Router();

  const movieController = new MovieController({ movieModel });

  router.get('/', movieController.getAll);

  router.get('/:id', movieController.getById);

  router.post('/', movieController.create);

  router.patch('/:id', movieController.updated);

  router.delete('/:id', movieController.delete);

  return router;
};
