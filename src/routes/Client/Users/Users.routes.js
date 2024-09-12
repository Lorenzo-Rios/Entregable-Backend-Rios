import { Router } from 'express'
import { GetUser, PostUser, PutUser, DeleteUser } from '../../../controllers/Client/User/User.controller.js'

const router = Router()

router.get('/', GetUser)
router.post('/', PostUser)
router.put('/:uid', PutUser)
router.delete('/:uid', DeleteUser)

export default router