import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  URL_BACKEND: process.env.URL_BACKEND || 'http://localhost:8080',
  URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:5173',
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD
};
