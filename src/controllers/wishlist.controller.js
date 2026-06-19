import { wishlistService } from '../services/wishlist.service.js';

export const wishlistController = {
  async getWishlist(req, res, next) {
    try {
      const data = await wishlistService.getWishlist(req.user.id);
      res.status(200).json({ ok: true, status: 200, data });
    } catch (error) {
      next(error);
    }
  },

  async addGame(req, res, next) {
    try {
      const { game_id } = req.body;
      const data = await wishlistService.addGameToWishlist(req.user.id, game_id);
      res.status(201).json({ ok: true, status: 201, data });
    } catch (error) {
      next(error);
    }
  },

  async removeGame(req, res, next) {
    try {
      const data = await wishlistService.removeGameFromWishlist(req.user.id, req.params.game_id);
      res.status(200).json({ ok: true, status: 200, message: data.message });
    } catch (error) {
      next(error);
    }
  }
};
