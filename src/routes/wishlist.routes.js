import { Router } from 'express';
import { wishlistController } from '../controllers/wishlist.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { addWishlistSchema } from '../validators/wishlist.validator.js';

const router = Router();

router.get('/', authMiddleware, wishlistController.getWishlist);
router.post('/', authMiddleware, validate(addWishlistSchema), wishlistController.addGame);
router.delete('/:game_id', authMiddleware, wishlistController.removeGame);

export default router;
