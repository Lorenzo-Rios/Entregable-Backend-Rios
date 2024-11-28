import { Router } from 'express';
import CartController from '../../../controllers/Client/Cart/Cart.controller.js';
import { GetCart, PostCart } from '../../../controllers/Client/PostCart/PostCart.controller.js'
import { passportCall } from '../../../passport/passportCall.js';
import { userRoleMiddleware } from '../../../middleware/userRoleMiddleware.js'

const router = Router();

router.get('/', GetCart);
router.get('/:cid', CartController.getCart);
router.post('/', PostCart);
router.post('/:cid/products/:pid', passportCall('jwt'), userRoleMiddleware,CartController.addProduct);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantity);
router.delete('/:cid/products/:pid', CartController.removeProduct);
router.delete('/:cid', CartController.clearCart);

export default router;