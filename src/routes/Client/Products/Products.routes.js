import { Router } from 'express'
import { GetProduct, PostProduct, PutProduct, DeleteProduct } from '../../../controllers/Client/Product/Product.controller.js'
import { authTokenMiddleware } from '../../../middleware/authToken.middleware.js'
import passport from 'passport'
import { passportCall } from '../../../passport/passportCall.js'
import { adminRoleMiddleware } from '../../../middleware/adminRoleMiddleware.js'

const router = Router();

router.get('/', GetProduct)
router.post('/', passportCall('jwt'), adminRoleMiddleware('admin'), PostProduct)
router.put('/:pid', passportCall('jwt'), adminRoleMiddleware('admin'), PutProduct)
router.delete('/:pid', passportCall('jwt'), adminRoleMiddleware('admin'), DeleteProduct)

export default router