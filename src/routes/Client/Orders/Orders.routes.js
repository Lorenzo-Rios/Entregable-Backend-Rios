import { Router } from 'express'
import { GetOrder, PostOrder, PutOrder, DeleteOrder } from '../../../controllers/Client/Order/Order.controller.js'
import { authTokenMiddleware } from '../../../middleware/authToken.middleware.js'
import { authorization } from '../../../middleware/authorization.middleware.js'

const router = Router()

router.get('/', authTokenMiddleware, authorization('admin'), GetOrder)
router.post('/', authTokenMiddleware, authorization('user'), PostOrder)
router.put('/:oid', authTokenMiddleware, authorization('admin'), PutOrder)
router.delete('/:oid', authTokenMiddleware, authorization('admin'), DeleteOrder)

export default router