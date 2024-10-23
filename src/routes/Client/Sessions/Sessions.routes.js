import { Router } from 'express'
import { authentication } from '../../../middleware/auth.middleware.js'
import { PostRegister, PostLogin, GetLogout, GetData, PostChangePass } from '../../../controllers/Client/Session/Session.controller.js'

const router = Router()

router.post('/register', PostRegister)
router.post('/login', PostLogin)
router.post('/changepass', PostChangePass)
router.get('/logout', GetLogout)
router.get('/current', authentication, GetData)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router