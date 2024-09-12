import { Router } from 'express'
import { GetOrder, PostOrder, PutOrder, DeleteOrder } from '../../../controllers/Client/Order/Order.controller.js'

const router = Router()

router.get('/', GetOrder)
router.post('/', PostOrder)
router.put('/:oid', PutOrder)
router.delete('/:oid', DeleteOrder)

export default router