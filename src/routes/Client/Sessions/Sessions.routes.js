import { Router } from 'express'
import { passportCall } from '../../../passport/passportCall.js'
import { GetGithub, GetGithubCallback, PostRegister, GetFailRegister, PostLogin, GetFailLogin, PostChangePass, GetLogout, GetData } from '../../../controllers/Client/Session/Session.controller.js'
import passport from 'passport'
import { authorization } from '../../../middleware/authorization.middleware.js'
import { checkAuthAndRole } from '../../../middleware/checkAuthAndRole.middleware.js'

const router = Router()

router.get('/github', passport.authenticate('github', { scope: ['user', 'user:email'] }), GetGithub)
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), GetGithubCallback)
router.post('/register', PostRegister)
router.get('/failregister', GetFailRegister)
router.post('/login', PostLogin)
router.get('/failogin', GetFailLogin)
router.post('/changepass', PostChangePass)
router.get('/logout', GetLogout)
router.get('/current',checkAuthAndRole('admin'), GetData)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router