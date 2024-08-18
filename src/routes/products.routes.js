import { Router } from 'express'
import { PostProduct, GetProduct, DeleteProduct, PutProduct } from "../controllers/Product/Product.controller"

const router = Router();

router.post('/', PostProduct);
router.get('/', GetProduct);
router.put('/:id', PutProduct);
router.delete('/:id', DeleteProduct);

export default router