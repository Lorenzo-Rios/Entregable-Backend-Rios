import { Router } from 'express'
import { GetUser, PostUser, PutUser, DeleteUser } from '../../../controllers/Client/User/User.controller.js'
import { authentication } from '../../../middleware/auth.middleware.js'

const router = Router()

router.get('/', authentication, GetUser)
router.post('/', PostUser)
router.put('/:uid', PutUser)
router.delete('/:uid', DeleteUser)

export default router