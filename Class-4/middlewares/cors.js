import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  });
