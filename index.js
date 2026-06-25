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

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root route to check if API is running
app.get('/', (req, res) => {
  res.json({ message: 'Games5150 API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
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
