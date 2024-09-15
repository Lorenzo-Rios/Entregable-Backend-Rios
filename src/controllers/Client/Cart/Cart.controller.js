import CartManager from '../../../manager/Cart.manager.js';

class CartController {
    // Obtener un carrito por ID
    static async getCart(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const cart = await CartManager.getCartById(cartId);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Agregar un producto al carrito
    static async addProduct(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { pid } = req.params;
            const { quantity } = req.body;

            const cart = await CartManager.addProductToCart(cartId, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Actualizar el carrito
    static async updateCart(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { products } = req.body;

            const cart = await CartManager.updateCart(cartId, products);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Eliminar un producto del carrito
    static async removeProduct(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { pid } = req.params;

            const cart = await CartManager.removeProductFromCart(cartId, pid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Eliminar todos los productos del carrito
    static async clearCart(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito

            const cart = await CartManager.clearCart(cartId);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async updateProductQuantity(req, res) {
        try {
            const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { pid } = req.params;
            const { quantity } = req.body;

            if (!quantity || quantity <= 0) {
                return res.status(400).send({ error: 'Quantity must be a positive number' });
            }

            const cart = await CartManager.updateProductQuantity(cartId, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default CartController;