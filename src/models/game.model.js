import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

export const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  developer: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  platform: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  cover_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  min_requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommended_requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  screenshots: {
    type: DataTypes.JSON,
    allowNull: true
  },
  steam_link: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'games'
});
