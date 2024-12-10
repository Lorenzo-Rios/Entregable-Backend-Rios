import { orderModel } from '../../models/order.model.js';

class OrderDAO {
    async getOrders(filter = {}, options = {}) {
        return await orderModel.paginate(filter, options);
    }

    async getOrderById(orderId) {
        return await orderModel.findById(orderId);
    }

    async createOrder(orderData) {
        return await orderModel.create(orderData);
    }

    async updateOrder(orderId, updates) {
        return await orderModel.updateOne({ _id: orderId }, { $set: updates });
    }

    async deleteOrder(orderId) {
        return await orderModel.deleteOne({ _id: orderId });
    }
}

export const orderDAO = new OrderDAO();