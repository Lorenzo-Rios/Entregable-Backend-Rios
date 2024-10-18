import CartManager from '../../../manager/FileSystem/Cart.manager.js';

class CartController {
    // Obtener un carrito por ID
    static async getCart(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid } = req.params
            const cart = await CartManager.getCartById(cid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Agregar un producto al carrito
    static async addProduct(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cart = await CartManager.addProductToCart(cid, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Actualizar el carrito
    static async updateCart(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid } = req.params  // ID fijo del carrito
            const { products } = req.body;

            const cart = await CartManager.updateCart(cid, products);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Eliminar un producto del carrito
    static async removeProduct(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid, pid } = req.params;

            const cart = await CartManager.removeProductFromCart(cid, pid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // Eliminar todos los productos del carrito
    static async clearCart(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid } = req.params
            const cart = await CartManager.clearCart(cid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async updateProductQuantity(req, res) {
        try {
            //const cartId = '66e4460b1b06874f35cef28f';  // ID fijo del carrito
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            if (!quantity || quantity <= 0) {
                return res.status(400).send({ error: 'Quantity must be a positive number' });
            }

            const cart = await CartManager.updateProductQuantity(cid, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default CartController;