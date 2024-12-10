import { orderRepository } from '../repositories/Order.repository.js';
import { cartModel } from '../models/cart.model.js';

class OrderService {
    async getOrders(page = 1, limit = 10) {
        return await orderRepository.getAllOrders({}, { page, limit });
    }

    async createOrder({ cartId, user, metodoDePago }) {
        const cart = await cartModel.findById(cartId).populate('products.product');

        if (!cart || cart.products.length === 0) {
            throw new Error('Cart is empty or not found');
        }

        const total = cart.products.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );

        const orderData = {
            user,
            metodoDePago,
            cart: {
                products: cart.products.map(item => ({
                    product: item.product._id,
                    price: item.product.price,
                    quantity: item.quantity,
                })),
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