import { Router } from 'express';
import {
    GetCart,
    GetCartId,
    PostCart,
    AddProductToCart,
    DeleteProductFromCart,
    UpdateCart,
    UpdateProductQuantity
} from '../../../controllers/Client/Cart/Cart.controller.js';

const router = Router();

router.get('/', GetCart);
router.get('/:cid', GetCartId);
router.post('/', PostCart);
router.post('/:cid/product/:pid', AddProductToCart);
router.delete('/:cid/product/:pid', DeleteProductFromCart);
router.put('/:cid', UpdateCart);
router.put('/:cid/product/:pid', UpdateProductQuantity);

export default router;