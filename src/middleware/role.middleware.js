import { ServerError } from '../utils/ServerError.js';

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new ServerError('Acceso denegado: solo admins', 403));
  }
  next();
};
