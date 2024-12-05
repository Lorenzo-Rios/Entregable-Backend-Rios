import { cartModel } from '../models/cart.model.js';

export const cartRepository = {
    findByIdWithProducts(cartId) {
        return cartModel.findById(cartId).populate('products.product');
    },
};