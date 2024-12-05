import { orderModel } from '../models/order.model.js';

class OrderDAO {
    async getAllOrders(page, limit) {
        try {
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
            };
            return await orderModel.paginate({}, options);
        } catch (error) {
            throw new Error('Error fetching orders: ' + error.message);
        }
    }

    async getOrderById(orderId) {
        try {
            return await orderModel.findById(orderId);
        } catch (error) {
            throw new Error('Error fetching order by ID: ' + error.message);
        }
    }

    async createOrder(orderData) {
        try {
            return await orderModel.create(orderData);
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    async updateOrder(orderId, updateData) {
        try {
            return await orderModel.findByIdAndUpdate(orderId, updateData, { new: true });
        } catch (error) {
            throw new Error('Error updating order: ' + error.message);
        }
    }

    async deleteOrder(orderId) {
        try {
            return await orderModel.findByIdAndDelete(orderId);
        } catch (error) {
            throw new Error('Error deleting order: ' + error.message);
        }
    }
}

export const orderDAO = new OrderDAO();