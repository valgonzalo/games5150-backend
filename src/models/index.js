import { User } from './user.model.js';
import { Genre } from './genre.model.js';
import { Game } from './game.model.js';
import { Wishlist } from './wishlist.model.js';

// Associations
Genre.hasMany(Game, { foreignKey: 'genre_id' });
Game.belongsTo(Genre, { foreignKey: 'genre_id' });

User.hasMany(Wishlist, { foreignKey: 'user_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });

Game.hasMany(Wishlist, { foreignKey: 'game_id' });
Wishlist.belongsTo(Game, { foreignKey: 'game_id' });

export { User, Genre, Game, Wishlist };
