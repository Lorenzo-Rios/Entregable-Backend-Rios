import { productModel } from '../models/product.model.js';
import { cartModel } from '../models/cart.model.js';
import { orderModel } from '../models/order.model.js';

class ViewDAO {
    async getCartById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products.product');
        } catch (error) {
            console.error('Error en ViewDAO.getCartById:', error);
            throw error;
        }
    }

    async getOrdersPaginated(page, limit) {
        try {
            return await orderModel.paginate({}, { page, limit });
        } catch (error) {
            console.error('Error en ViewDAO.getOrdersPaginated:', error);
            throw error;
        }
    }

    async getProductsPaginated(page, limit) {
        try {
            return await productModel.paginate({}, { page, limit });
        } catch (error) {
            console.error('Error en ViewDAO.getProductsPaginated:', error);
            throw error;
        }
    }
}

export const viewDAO = new ViewDAO();