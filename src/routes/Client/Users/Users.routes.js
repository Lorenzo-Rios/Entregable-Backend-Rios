import { Router } from 'express'
import { GetUser, PostUser, PutUser } from '../../../controllers/Client/User/User.controller.js'

const router = Router()

router.get('/', GetUser)
router.post('/', PostUser)
router.put('/:uid', PutUser)

export default router