import { Router } from 'express'
import { PostCart, GetCart, AddProductToCart} from '../controllers/Client/cart.controller'

const router = Router()

router.post('/', PostCart)
router.get('/:cid', GetCart)
router.post('/:cid/product/:pid', AddProductToCart)

export default router