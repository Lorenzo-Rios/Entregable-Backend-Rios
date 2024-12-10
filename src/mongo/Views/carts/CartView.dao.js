import { cartModel } from '../../models/cart.model.js';

class CartViewDAO {
    async getCartById(cartId) {
        return await cartModel.findById(cartId).populate('products.product');
    }

    async updateCart(cartId, updates) {
        return await cartModel.findByIdAndUpdate(cartId, updates, { new: true });
    }
}

export const cartDAO = new CartViewDAO();