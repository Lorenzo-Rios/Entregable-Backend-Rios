import CartService from '../../services/Cart.service.js';

class CartViewAdapter {
    async getCartView(cartId) {
        const cart = await CartService.getCartById(cartId);
        const cartTotal = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);

        return {
            cart,
            cartTotal,
        };
    }
}

const cartViewAdapter = new CartViewAdapter();

export {
    cartViewAdapter
}