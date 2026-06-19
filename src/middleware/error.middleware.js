export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  return res.status(status).json({ ok: false, status, message });
};
