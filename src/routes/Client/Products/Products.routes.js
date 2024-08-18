import { Router } from 'express'
import { PostProduct } from "../../../controllers/Product/Product.controller"

const router = Router();

router.post('/', PostProduct);
router.get('/', GetProduct);
router.put('/:id', PutProduct);
router.delete('/:id', DeleteProduct);

export default router