import { Router } from 'express'
import { GetProduct, PostProduct, PutProduct, DeleteProduct } from '../../../controllers/Client/Product/Product.controller.js'

const router = Router();

router.get('/', GetProduct)
router.post('/', PostProduct)
router.put('/:pid', PutProduct)
router.delete('/:pid', DeleteProduct)

export default router