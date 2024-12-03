import { Router } from 'express'
import { renderMain, renderChat, renderRealTimeProducts, renderCart, renderProducts , renderRegister, renderLogin, renderChangePass } from '../../../controllers/Client/View/View.controller.js'
import { passportCall } from '../../../passport/passportCall.js'
import { authorization } from '../../../middleware/authorization.middleware.js'

const router = Router()

router.get('/', renderMain)
router.get('/chat', passportCall('jwt'), authorization('user'), renderChat)
router.get('/realtimeproducts', passportCall('jwt'), authorization('admin'), renderRealTimeProducts)
router.get('/cart', passportCall('jwt'), authorization('user'), renderCart)
router.get('/products', renderProducts)
router.get('/register', renderRegister)
router.get('/login', renderLogin)
router.get('/newpass', renderChangePass)
//router.get('/newpassword', renderNewPassword)
//router.get('/changepassword', renderChangePassword)

export default router