import { orderRepository } from '../../repositories/Order.repository.js';

class OrderViewAdapter {
    async getPaginatedOrders(page, limit) {
        const orders = await orderRepository.getPaginatedOrders({}, { page, limit });
        return {
            orders: orders.docs,
            totalPages: orders.totalPages,
            currentPage: orders.page,
            prevPage: orders.prevPage,
            nextPage: orders.nextPage,
            hasPrevPage: orders.hasPrevPage,
            hasNextPage: orders.hasNextPage,
            prevLink: orders.hasPrevPage ? `/orders?page=${orders.prevPage}&limit=${limit}` : null,
            nextLink: orders.hasNextPage ? `/orders?page=${orders.nextPage}&limit=${limit}` : null,
        };
    }
}

export const orderViewAdapter = new OrderViewAdapter();