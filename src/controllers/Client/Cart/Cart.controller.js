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

export {
    GetCart,
    PostCart
};