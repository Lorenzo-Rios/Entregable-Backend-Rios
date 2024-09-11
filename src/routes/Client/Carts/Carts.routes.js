import { Router } from 'express'
import { GetCart, GetCartId } from '../../../controllers/Client/Cart/Cart.controller.js'

const router = Router()

router.get('/', GetCart)
router.get('/:cid', GetCartId)
//router.post('/', PostCart)
//router.post('/:cid/product/:pid', AddProductToCart)

export default router