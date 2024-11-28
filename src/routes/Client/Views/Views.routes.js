import { Router } from 'express'
import { renderMain, renderUser, renderChat, renderRealTimeProducts, renderCart, renderProducts , renderRegister, renderLogin, renderChangePass } from '../../../controllers/Client/View/View.controller.js'
import { userRoleMiddleware } from '../../../middleware/userRoleMiddleware.js'
import { passportCall } from '../../../passport/passportCall.js'
import { adminRoleMiddleware } from '../../../middleware/adminRoleMiddleware.js'

const router = Router()

router.get('/', renderMain)
router.get('/chat', passportCall('jwt'), userRoleMiddleware, renderChat)
router.get('/realtimeproducts', passportCall('jwt'), adminRoleMiddleware('admin'), renderRealTimeProducts)
router.get('/user', renderUser)
router.get('/cart', passportCall('jwt'), userRoleMiddleware, renderCart)
router.get('/products', renderProducts)
router.get('/register', renderRegister)
router.get('/login', renderLogin)
router.get('/newpass', renderChangePass)
//router.get('/newpassword', renderNewPassword)
//router.get('/changepassword', renderChangePassword)

export default router