import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { User } from './user.model.js';
import { Game } from './game.model.js';

export const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Game,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'wishlists',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'game_id']
    }
  ]
});
