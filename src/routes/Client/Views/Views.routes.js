import { Router } from 'express'
import { renderMain, renderUser, renderChat, renderRealTimeProducts, renderCart, renderProducts , renderRegister, renderLogin, renderChangePass } from '../../../controllers/Client/View/View.controller.js'
import { authTokenMiddleware } from '../../../middleware/authToken.middleware.js'

const router = Router()

router.get('/', renderMain)
router.get('/chat', authTokenMiddleware, renderChat)
router.get('/realtimeproducts', renderRealTimeProducts)
router.get('/user', renderUser)
router.get('/cart', renderCart)
router.get('/products', renderProducts)
router.get('/register', renderRegister)
router.get('/login', renderLogin)
router.get('/newpass', renderChangePass)
//router.get('/newpassword', renderNewPassword)
//router.get('/changepassword', renderChangePassword)

export default router