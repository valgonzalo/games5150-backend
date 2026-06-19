import { Sequelize } from 'sequelize';
import { ENVIRONMENT } from './environment.js';

const sequelize = new Sequelize(ENVIRONMENT.DB_URL, {
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
