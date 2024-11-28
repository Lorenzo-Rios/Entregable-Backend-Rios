import { Router } from 'express'
import { GetProduct, PostProduct, PutProduct, DeleteProduct } from '../../../controllers/Client/Product/Product.controller.js'
import { authTokenMiddleware } from '../../../middleware/authToken.middleware.js'

const router = Router();

router.get('/', GetProduct)
router.post('/', PostProduct)
router.put('/:pid', PutProduct)
router.delete('/:pid', authTokenMiddleware, DeleteProduct)

export default router