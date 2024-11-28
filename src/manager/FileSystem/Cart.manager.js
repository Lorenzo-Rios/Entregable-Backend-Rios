import { cartModel } from '../../models/cart.model.js';
import { productModel } from '../../models/product.model.js'; 

class CartManager {
    // Método para obtener un carrito por ID
    static async getCartById(cartId) {
        return cartModel.findById(cartId).populate('products.product');
    }

    // Método para agregar productos a un carrito
    static async addProductToCart(cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);

        if (!cart) throw new Error('Cart not found');
        if (!product) throw new Error('Product not found');

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
        
        if (existingProductIndex >= 0) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Si no está, lo agrega al carrito
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();
        return cart;
    }

    // Método para actualizar el carrito completo
    static async updateCart(cartId, products) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = products;
        await cart.save();
        return cart;
    }

    // Método para eliminar un producto de un carrito
    static async removeProductFromCart(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return cart;
    }

    // Método para eliminar todos los productos de un carrito
    static async clearCart(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.products = [];
        await cart.save();
        return cart;
    }

    static async addProductToCart(cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);
    
        if (!cart) throw new Error('Cart not found');
        if (!product) throw new Error('Product not found');
    
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
        
        if (existingProductIndex >= 0) {
            // Si el producto ya está en el carrito, reemplaza la cantidad
            cart.products[existingProductIndex].quantity = quantity; // Cambiar a esta línea si reemplazas la cantidad
        } else {
            // Si no está, lo agrega al carrito
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }
    
        await cart.save();
        return cart;
    }
}

export default CartManager;