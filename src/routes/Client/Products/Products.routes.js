import { Router } from 'express'
import { GetProduct, GetProductId, PostProduct } from '../../../controllers/Client/Product/Product.controller.js'

const router = Router();

router.get('/', GetProduct);
router.get('/:pid', GetProductId)
router.post('/', PostProduct);
//router.delete('/:id', DeleteProduct);

export default router