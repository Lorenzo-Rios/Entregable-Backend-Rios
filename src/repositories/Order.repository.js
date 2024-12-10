import { orderDAO } from '../mongo/Order.dao.js';

class OrderRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAllOrders(filter, options) {
        return await this.dao.getOrders(filter, options);
    }

    async findOrderById(orderId) {
        return await this.dao.getOrderById(orderId);
    }

    async createNewOrder(orderData) {
        return await this.dao.createOrder(orderData);
    }

    async updateExistingOrder(orderId, updates) {
        return await this.dao.updateOrder(orderId, updates);
    }

    async removeOrder(orderId) {
        return await this.dao.deleteOrder(orderId);
    }
}

export const orderRepository = new OrderRepository(orderDAO);