import { Wishlist } from '../models/wishlist.model.js';
import { Game } from '../models/game.model.js';
import { Genre } from '../models/genre.model.js';

export const wishlistRepository = {
  async findAllByUserId(user_id) {
    return await Wishlist.findAll({
      where: { user_id },
      include: [
        {
          model: Game,
          include: [{ model: Genre, attributes: ['id', 'name'] }]
        }
      ]
    });
  },

  async findByUserAndGame(user_id, game_id) {
    return await Wishlist.findOne({ where: { user_id, game_id } });
  },

  async create(user_id, game_id) {
    return await Wishlist.create({ user_id, game_id });
  },

  async delete(user_id, game_id) {
    return await Wishlist.destroy({ where: { user_id, game_id } });
  }
};
