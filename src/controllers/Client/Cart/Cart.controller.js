import { cartModel } from '../../../models/cart.model.js';
import { productModel } from '../../../models/products.model.js';

async function GetCart(req, res) {
    try {
        const carts = await cartModel.find();
        res.send({ status: 'success', payload: carts });
    } catch (error) {
        console.error('Error en GetCart:', error);
        res.status(500).send('Error fetching carts');
    }
}

async function GetCartId(req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.product');
        if (!cart) {
            return res.status(404).send({ status: 'error', error: 'Cart not found' });
        }
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        console.error('Error en GetCartId:', error);
        res.status(500).send('Error fetching cart');
    }
}

async function PostCart(req, res) {
    try {
        const newCart = new cartModel({ products: [] });
        await newCart.save();
        res.status(201).send({ status: 'success', data: newCart });
    } catch (error) {
        console.error('Error en PostCart:', error);
        res.status(500).send('Error creating cart');
    }
}

async function AddProductToCart(req, res) {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body; // Default quantity is 1

        const cart = await cartModel.findById(cid);
        const product = await productModel.findById(pid);

        if (!cart || !product) {
            return res.status(404).send({ status: 'error', error: 'Cart or product not found' });
        }

        const cartProduct = cart.products.find(p => p.product.toString() === pid);
        if (cartProduct) {
            cartProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        // Actualizar el stock del producto
        product.stock -= quantity;
        await product.save();

        await cart.save();
        res.status(200).send({ status: 'success', data: cart });
    } catch (error) {
        console.error('Error en AddProductToCart:', error);
        res.status(500).send('Error adding product to cart');
    }
}

async function DeleteProductFromCart(req, res) {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', error: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.status(200).send({ status: 'success', message: 'Product removed from cart', data: cart });
    } catch (error) {
        console.error('Error en DeleteProductFromCart:', error);
        res.status(500).send('Error removing product from cart');
    }
}

async function UpdateCart(req, res) {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', error: 'Cart not found' });
        }

        cart.products = products;
        await cart.save();
        res.status(200).send({ status: 'success', message: 'Cart updated successfully', data: cart });
    } catch (error) {
        console.error('Error en UpdateCart:', error);
        res.status(500).send('Error updating cart');
    }
}

async function UpdateProductQuantity(req, res) {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', error: 'Cart not found' });
        }

        const cartProduct = cart.products.find(p => p.product.toString() === pid);
        if (cartProduct) {
            cartProduct.quantity = quantity;
        } else {
            return res.status(404).send({ status: 'error', error: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).send({ status: 'success', message: 'Product quantity updated successfully', data: cart });
    } catch (error) {
        console.error('Error en UpdateProductQuantity:', error);
        res.status(500).send('Error updating product quantity');
    }
}

export {
    GetCart,
    GetCartId,
    PostCart,
    AddProductToCart,
    DeleteProductFromCart,
    UpdateCart,
    UpdateProductQuantity
};