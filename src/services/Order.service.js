import { orderRepository } from '../repositories/Order.repository.js';
import { cartModel } from '../models/cart.model.js';
import  productRepository  from '../repositories/Product.repository.js';

class OrderService {
    async getOrders(page = 1, limit = 10) {
        return await orderRepository.getAllOrders({}, { page, limit });
    }

    async createOrder({ cartId, user, metodoDePago }) {
        const cart = await cartModel.findById(cartId).populate('products.product');

        if (!cart || cart.products.length === 0) {
            throw new Error('Cart is empty or not found');
        }

        const productsToPurchase = [];
        let total = 0;

        for (const item of cart.products) {
            const product = await productRepository.findProductById(item.product._id);

            if (!product) {
                throw new Error(`Product with ID ${item.product._id} not found`);
            }

            if (product.stock >= item.quantity) {
                productsToPurchase.push({
                    product: product._id,
                    price: product.price,
                    quantity: item.quantity,
                });
                total += product.price * item.quantity;

                // Actualizar el stock
                await productRepository.updateProductStock(product._id, product.stock - item.quantity);
            } else {
                console.warn(`Insufficient stock for product ${product.tittle}`);
            }
        }

        if (productsToPurchase.length === 0) {
            throw new Error('No products available to purchase');
        }

        const orderData = {
            user,
            metodoDePago,
            cart: {
                products: productsToPurchase,
                total,
            },
            estado: 'Pendiente',
        };

        const newOrder = await orderRepository.createNewOrder(orderData);

        // Vaciar carrito
        cart.products = [];
        await cart.save();

        return newOrder;
    }

    async updateOrder(orderId, updates) {
        const updatedOrder = await orderRepository.updateExistingOrder(orderId, updates);
        if (!updatedOrder.matchedCount) {
            throw new Error('Order not found');
        }
        return updatedOrder;
    }

    async deleteOrder(orderId) {
        return await orderRepository.removeOrder(orderId);
    }

    async getPaginatedOrders  (filter, options) {
        const result = await orderRepository.getPaginatedOrders(filter, options);
        if (!result.docs || result.docs.length === 0) {
            throw new Error('No se encontraron ordenes');
        }
        return result;
    }
}

export const orderService = new OrderService();