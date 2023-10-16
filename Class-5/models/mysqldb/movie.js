import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'moviesdb',
});

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const [movies] = await connection.query(
        'select  BIN_TO_UUID(M.id) as id, M.title, M.year, M.director, M.duration, M.poster, M.rate, G.name as genre from genre as G inner join movie_genres as MG on G.id = MG.genre_id inner join movie as M on MG.movie_id = M.id where LOWER(G.name) like ?',
        [`%${genre.toLowerCase()}%`]
      );

      return movies;
    }

    const [movies, tableInfo] = await connection.query(
      `select BIN_TO_UUID(id)  as id , title, year, director, duration, poster, rate from movie;`
    );

    return movies;
  }

  static async getById({ id }) {
    const [movie] = await connection.query(
      'select BIN_TO_UUID(id)  as id , title, year, director, duration, poster, rate from movie where id = UUID_TO_BIN(?)',
      [id]
    );

    if (!movie.length) {
      return null;
    }
    return movie;
  }

  static async create(movie) {
    const [uuidQuery] = await connection.query(`select UUID() as uuid;`);
    const [{ uuid }] = uuidQuery;
    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate ) values 
  ( UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
        [
          uuid,
          movie.title,
          movie.year,
          movie.director,
          movie.duration,
          movie.poster,
          movie.rate,
        ]
      );
    } catch (error) {
      console.log(error);
      throw new Error('Error to create a movie');
    }

    try {
      for (const genre of movie.genre) {
        const [idGenre] = await connection.query(
          `select id from genre where name = ?`,
          [genre]
        );

        await connection.query(
          `INSERT INTO movie_genres(movie_id, genre_id) values
          (UUID_TO_BIN(?), ?)`,
          [uuid, idGenre[0].id]
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error to insert genre');
    }

    const [movieCreated] = await connection.query(
      `select BIN_TO_UUID(id)  as id , title, year, director, duration, poster, rate from movie WHERE id = UUID_TO_BIN(?)`,
      [uuid]
    );

    if (!movieCreated.length) {
      return null;
    }

    const [movieGenreIds] = await connection.query(
      `select genre_id from movie_genres where movie_id = UUID_TO_BIN(?);`,
      [uuid]
    );

    let genreList = [];
    for (const movieGenre of movieGenreIds) {
      const [genre] = await connection.query(
        `select name from genre where id = ?;`,
        [movieGenre.genre_id]
      );
      genreList.push(genre[0].name);
    }

    return { ...movieCreated[0], genre: genreList };
  }

  static async update({ id, movie }) {
    const { genre: genres, ...movieData } = movie;

    let isMovieUpdate = false;
    let isMovieGenresUpdate = false;

    try {
      const [updateMovie] = await connection.query(
        `UPDATE movie SET ? WHERE id = UUID_TO_BIN(?);`,
        [{ ...movieData }, id]
      );
      isMovieUpdate = Boolean(updateMovie.affectedRows);
    } catch (error) {
      throw new Error('Error to remove a movie');
    }

    try {
      for (const genreName of genres) {
        const [idGenre] = await connection.query(
          `SELECT id FROM genre WHERE name = ?`,
          [genreName]
        );
        const [updateMovieGenres] = await connection.query(
          `UPDATE movie_genres SET ? WHERE movie_id = UUID_TO_BIN(?);`,
          [{ genre_id: idGenre[0].id }, id]
        );
        isMovieGenresUpdate = Boolean(updateMovieGenres.affectedRows);
      }
    } catch (error) {
      console.log(error);

      throw new Error('Error to remove a genres');
    }

    return isMovieUpdate && isMovieGenresUpdate;
  }

  static async delete({ id }) {
    const [movie] = await connection.query(
      `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return Boolean(movie.affectedRows);
  }
}
