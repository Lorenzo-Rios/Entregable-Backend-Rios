import { Router } from 'express'
import { GetUser } from '../../../controllers/Client/User/User.controller.js'

const router = Router()

router.get('/', GetUser)

export default router