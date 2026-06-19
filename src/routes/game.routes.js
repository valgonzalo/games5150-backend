import { Router } from 'express';
import { gameController } from '../controllers/game.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/role.middleware.js';

const router = Router();

router.get('/', gameController.getAll);
router.get('/:id', gameController.getById);
router.post('/', authMiddleware, adminOnly, gameController.create);
router.put('/:id', authMiddleware, adminOnly, gameController.update);
router.delete('/:id', authMiddleware, adminOnly, gameController.delete);

export default router;
