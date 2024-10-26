import { Router } from 'express'
import { GetUser, PostUser, PutUser, DeleteUser } from '../../../controllers/Client/User/User.controller.js'
import { authTokenMiddleware } from '../../../middleware/authToken.middleware.js'

const router = Router()

router.get('/', authTokenMiddleware, GetUser)
router.post('/', PostUser)
router.put('/:uid', PutUser)
router.delete('/:uid', DeleteUser)

export default router