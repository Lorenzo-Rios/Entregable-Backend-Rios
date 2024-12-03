import { Router } from 'express'
import { GetUser, PostUser, PutUser, DeleteUser } from '../../../controllers/Client/User/User.controller.js'
import { passportCall } from '../../../passport/passportCall.js'
import { authorization } from '../../../middleware/authorization.middleware.js'

const router = Router()

router.get('/', passportCall('jwt'), authorization('admin'), GetUser)
router.post('/', PostUser)
router.put('/:uid', PutUser)
router.delete('/:uid', DeleteUser)

export default router