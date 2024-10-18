import { Router } from 'express'
import { PostRegister, PostLogin, GetLogout } from '../../../controllers/Client/Session/Session.controller.js'

const router = Router()

router.post('/register', PostRegister)
router.post('/login', PostLogin)
router.get('/logout', GetLogout)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router