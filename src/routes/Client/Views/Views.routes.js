import { Router } from 'express'
import { renderMain, renderUser, renderChat, renderRealTimeProducts, renderCart } from '../../../controllers/Client/View/View.controller.js'

const router = Router()

router.get('/', renderMain)
router.get('/chat', renderChat)
router.get('/realtimeproducts', renderRealTimeProducts)
router.get('/user', renderUser)
router.get('/cart', renderCart)

export default router;