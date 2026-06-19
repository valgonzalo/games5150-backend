import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req, res, next) {
    try {
      const data = await authService.register(req.body);
      res.status(201).json({ ok: true, status: 201, message: data.message });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { verification_token } = req.query;
      const data = await authService.verifyEmail(verification_token);
      res.status(200).json({ ok: true, status: 200, message: data.message });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const data = await authService.login(req.body);
      res.status(200).json({ ok: true, status: 200, data });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req, res, next) {
    try {
      // req.user is set by authMiddleware
      res.status(200).json({ ok: true, status: 200, data: { user: req.user } });
    } catch (error) {
      next(error);
    }
  }
};
