import express from 'express';
import cors from 'cors';
import { ENVIRONMENT } from './src/config/environment.js';
import sequelize from './src/config/db.js';
import './src/models/index.js'; // Import associations
import authRoutes from './src/routes/auth.routes.js';
import genreRoutes from './src/routes/genre.routes.js';
import gameRoutes from './src/routes/game.routes.js';
import wishlistRoutes from './src/routes/wishlist.routes.js';
import { errorHandler } from './src/middleware/error.middleware.js';

// TODO: Import routes when ready

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Database connection & Server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync models (in dev)
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(ENVIRONMENT.PORT, () => {
      console.log(`Server running on port ${ENVIRONMENT.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
