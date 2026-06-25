import { Router } from 'express';
import { gameController } from '../controllers/game.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { gameSchema } from '../validators/game.validator.js';

const router = Router();

router.get('/', gameController.getAll);
router.get('/:id', gameController.getById);
router.post('/', authMiddleware, adminOnly, validate(gameSchema), gameController.create);
router.put('/:id', authMiddleware, adminOnly, validate(gameSchema), gameController.update);
router.delete('/:id', authMiddleware, adminOnly, gameController.delete);

export default router;
