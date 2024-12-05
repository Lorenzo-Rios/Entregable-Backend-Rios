import { Router } from 'express';
import { GetProduct, PostProduct, PutProduct, DeleteProduct } from '../../../controllers/Client/Product/Product.controller.js';
import { passportCall } from '../../../passport/passportCall.js';
import { authorization } from '../../../middleware/authorization.middleware.js';


const router = Router();

router.get('/', GetProduct);
router.post('/', passportCall('jwt'), authorization('admin'), PostProduct);
router.put('/:pid', passportCall('jwt'), authorization('admin'), PutProduct);
router.delete('/:pid', passportCall('jwt'), authorization('admin'), DeleteProduct);

export default router;