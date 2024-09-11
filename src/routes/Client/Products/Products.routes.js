import { Router } from 'express'
import { GetProduct } from '../../../controllers/Client/Product/Product.controller.js'

const router = Router();

//router.post('/', PostProduct);
router.get('/', GetProduct);
//router.delete('/:id', DeleteProduct);

export default router