import { Router } from 'express'
import { GetOrder, PostOrder, PutOrder, DeleteOrder } from '../../../controllers/Client/Order/Order.controller.js'
import { passportCall } from '../../../passport/passportCall.js'
import { authorization } from '../../../middleware/authorization.middleware.js'

const router = Router()

router.get('/', passportCall('jwt'), authorization('admin'), GetOrder)
router.post('/', passportCall('jwt'), authorization('user'), PostOrder)
router.put('/:oid', passportCall('jwt'), authorization('admin'), PutOrder)
router.delete('/:oid', passportCall('jwt'), authorization('admin'), DeleteOrder)

export default router