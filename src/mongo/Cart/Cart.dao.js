import { cartModel } from '../../models/cart.model.js';
import { productModel } from '../../models/product.model.js';

class CartDAO {
    static async getCartById(cartId) {
        return await cartModel.findById(cartId).populate('products.product');
    }

    static async addProductToCart(cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);

        if (!cart) throw new Error('Cart not found');
        if (!product) throw new Error('Product not found');

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex >= 0) {
            // Actualiza la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Agrega un nuevo producto
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    }

    static async updateCart(cartId, products) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = products;
        await cart.save();
        return cart;
    }

    static async removeProductFromCart(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return cart;
    }

    static async clearCart(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = [];
        await cart.save();
        return cart;
    }

    static async updateProductQuantity(cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);

        if (!cart) throw new Error('Cart not found');
        if (!product) throw new Error('Product not found');

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity = quantity; // Reemplaza la cantidad
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    }
}

export default CartDAO;