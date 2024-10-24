import { Router } from 'express'
import { authentication } from '../../../middleware/auth.middleware.js'
import { PostRegister, GetFailRegister, PostLogin, GetFailLogin, PostChangePass, GetLogout, GetData } from '../../../controllers/Client/Session/Session.controller.js'
import passport from 'passport'

const router = Router()

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), PostRegister)
router.get('/failregister', GetFailRegister)
router.post('/login', passport.authenticate('login', { failureRedirect: '/failogin' }), PostLogin)
router.get('/failogin', GetFailLogin)
router.post('/changepass', PostChangePass)
router.get('/logout', GetLogout)
router.get('/current', authentication, GetData)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router