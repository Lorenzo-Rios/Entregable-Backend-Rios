import { productModel } from '../../models/product.model.js';

class ProductViewDAO {
    async getProducts(filter = {}, options = {}) {
        return await productModel.paginate(filter, options);
    }

    async getProductById(productId) {
        return await productModel.findById(productId);
    }
}

export const productDAO = new ProductViewDAO();