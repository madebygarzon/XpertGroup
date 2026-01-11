import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  database: {
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/catapi'
  },
  catApi: {
    url: process.env.CAT_API_URL || 'https://api.thecatapi.com/v1',
    key: process.env.CAT_API_KEY || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200'
  }
};
