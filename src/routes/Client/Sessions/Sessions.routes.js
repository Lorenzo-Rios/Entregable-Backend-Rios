import { Router } from 'express'
import { PostRegister, PostLogin } from '../../../controllers/Client/Session/Session.controller.js'

const router = Router()

router.post('/register', PostRegister)
router.post('/login', PostLogin)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router