import z from 'zod';

const MOVIE_SCHEMA = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Movie tittle is required',
  }),
  year: z.number().int().min(1990).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({ message: 'Poster must be a valid url' }),
  genre: z.array(
    z.enum([
      'Action',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Mystery',
      'Romance',
      'Thriller',
      'Western',
      'Crime',
    ])
  ),
});

export const validaMovie = (input) => {
  return MOVIE_SCHEMA.safeParse(input);
};

export const validParcialMovie = (input) => {
  return MOVIE_SCHEMA.partial().safeParse(input);
};
