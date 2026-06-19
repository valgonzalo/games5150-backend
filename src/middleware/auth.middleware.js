import { ServerError } from '../utils/ServerError.js';
import { verifyToken } from '../utils/jwt.utils.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ServerError('Token requerido', 401);
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(new ServerError('Token inválido o expirado', 401));
  }
};
