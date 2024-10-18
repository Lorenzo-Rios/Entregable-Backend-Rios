import { Router } from 'express'
import { renderMain, renderUser, renderChat, renderRealTimeProducts, renderCart, renderProducts , renderRegister, renderLogin } from '../../../controllers/Client/View/View.controller.js'
import { authentication } from '../../../middleware/auth.middleware.js'

const router = Router()

router.get('/', renderMain)
router.get('/chat', authentication, renderChat)
router.get('/realtimeproducts', renderRealTimeProducts)
router.get('/user', renderUser)
router.get('/cart', renderCart)
router.get('/products', renderProducts)
router.get('/register', renderRegister)
router.get('/login', renderLogin)
//router.get('/newpassword', renderNewPassword)
//router.get('/changepassword', renderChangePassword)

export default router