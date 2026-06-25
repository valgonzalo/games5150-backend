import { Router } from 'express';
import { genreController } from '../controllers/genre.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { genreSchema } from '../validators/genre.validator.js';

const router = Router();

router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/', authMiddleware, adminOnly, validate(genreSchema), genreController.create);
router.put('/:id', authMiddleware, adminOnly, validate(genreSchema), genreController.update);
router.delete('/:id', authMiddleware, adminOnly, genreController.delete);

export default router;
