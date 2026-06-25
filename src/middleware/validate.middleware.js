import { ServerError } from '../utils/ServerError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      const messages = error.errors.map(err => err.message).join(', ');
      next(new ServerError(messages, 400));
    } else {
      next(error);
    }
  }
};
