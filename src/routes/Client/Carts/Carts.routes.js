import { Router } from 'express';
import {
    GetCart,
    PostCart
} from '../../../controllers/Client/Cart/Cart.controller.js';

const router = Router();

// Obtener el carrito
router.get('/', GetCart);

// Crear un nuevo carrito
router.post('/', PostCart);


export default router;