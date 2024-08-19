import { Router } from 'express'
import { renderChat, renderHome, renderRealTimeProducts} from '../../../controllers/Client/View/View.controller.js'

const router = Router()

router.get('/', renderHome)
router.get('/chat', renderChat)
router.get('/realtimeproducts', renderRealTimeProducts)

export default router;