import CartService from '../../../services/Cart.service.js';

class CartController {
    static async getCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartService.getCartById(cid);
            res.send(cart);
        } catch (error) {
            res.status(404).send({ error: error.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            if (!quantity || quantity <= 0) {
                return res.status(400).send({ error: 'Quantity must be greater than 0' });
            }

            const cart = await CartService.addProductToCart(cid, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async updateCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;

            if (!Array.isArray(products)) {
                return res.status(400).send({ error: 'Products must be an array' });
            }

            const cart = await CartService.updateCart(cid, products);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async removeProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await CartService.removeProductFromCart(cid, pid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async clearCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartService.clearCart(cid);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            if (!quantity || quantity <= 0) {
                return res.status(400).send({ error: 'Quantity must be greater than 0' });
            }

            const cart = await CartService.updateProductQuantity(cid, pid, quantity);
            res.send(cart);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default CartController;