import { orderModel } from '../../models/order.model.js';

class OrderViewDAO {
    async getOrders(filter = {}, options = {}) {
        return await orderModel.paginate(filter, options);
    }
}

export const orderDAO = new OrderViewDAO();