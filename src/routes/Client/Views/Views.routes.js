import { Router } from 'express'
import { renderMain, renderHome, renderChat, renderRealTimeProducts} from '../../../controllers/Client/View/View.controller.js'

const router = Router()

router.get('/', renderMain)
router.get('/home', renderHome)
router.get('/chat', renderChat)
router.get('/realtimeproducts', renderRealTimeProducts)

export default router;