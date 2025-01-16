import CartDao from '../mongo/Cart/Cart.dao.js';

const CartService = {
    getCartById: async (cartId) => {
        const cart = await CartDao.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    },
    addProductToCart: async (cartId, productId, quantity) => {
        if (!quantity || quantity <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
        return await CartDao.addProductToCart(cartId, productId, quantity);
    },
    updateCart: async (cartId, products) => {
        if (!Array.isArray(products)) {
            throw new Error('Los productos deben ser un arreglo');
        }
        return await CartDao.updateCart(cartId, products);
    },
    removeProductFromCart: async (cartId, productId) => {
        return await CartDao.removeProductFromCart(cartId, productId);
    },
    clearCart: async (cartId) => {
        return await CartDao.clearCart(cartId);
    },
    updateProductQuantity: async (cartId, productId, quantity) => {
        if (!quantity || quantity <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
        return await CartDao.addProductToCart(cartId, productId, quantity); // Actualiza la cantidad existente
    },
};

export default CartService;