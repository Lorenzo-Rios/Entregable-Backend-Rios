import { Router } from 'express'
import { PostProduct, GetProduct } from '../../../controllers/Client/Product/Product.controller.js'
const router = Router();

router.post('/', PostProduct);
router.get('/', GetProduct);

export default router