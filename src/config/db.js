import { Sequelize } from 'sequelize';
import { ENVIRONMENT } from './environment.js';

const sequelize = new Sequelize(ENVIRONMENT.DB_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
