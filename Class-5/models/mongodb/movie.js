import { randomUUID } from 'node:crypto';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const uri =
  'mongodb+srv://test:dev@cluster0.2qzecsg.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    const database = client.db('fiverr-db');
    const movies = database.collection('movies');
    return movies;
  } catch (error) {
    console.error('Error to conect DB', error.message);
    await client.close();
  }
}

export class MovieModel {
  static async getAll({ genre }) {
    const movies = await connect();

    if (genre) {
      return movies
        .find({ genre: { $elemMatch: { $regex: genre, $options: 'i' } } })
        .toArray();
    }

    return movies.find({}).toArray();
  }

  static async getById({ id }) {
    const movies = await connect();
    const movie = new ObjectId(id);

    return movies.findOne({ _id: movie });
  }

  static async create(movie) {
    const db = await connect();
    const { insertId } = await db.insertOne(movie);

    return { ...movie, id: insertId };
  }

  static async update({ id, movie }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const updateMovie = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: movie },
      { returnDocument: 'after' }
    );
    if (!updateMovie) {
      return null;
    }

    return updateMovie;
  }

  static async delete({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }
}
