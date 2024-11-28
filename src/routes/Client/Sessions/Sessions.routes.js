import { Router } from 'express'
import { roleMiddleware } from '../../../middleware/roleMiddleware.js'
import { GetGithub, GetGithubCallback, PostRegister, GetFailRegister, PostLogin, GetFailLogin, PostChangePass, GetLogout, GetData } from '../../../controllers/Client/Session/Session.controller.js'
import passport from 'passport'

const router = Router()

router.get('/github', passport.authenticate('github', { scope: ['user', 'user:email'] }), GetGithub)
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), GetGithubCallback)
router.post('/register', PostRegister)
router.get('/failregister', GetFailRegister)
router.post('/login', PostLogin)
router.get('/failogin', GetFailLogin)
router.post('/changepass', PostChangePass)
router.get('/logout', GetLogout)
router.get('/current', passport.authenticate('jwt', {session: false}), roleMiddleware('admin'), GetData)
//router.post('/newpassword', PostNewPassword)
//router.post('/changepassword', PostChangePassword)

export default router