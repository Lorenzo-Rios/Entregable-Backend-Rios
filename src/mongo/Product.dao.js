import { productModel } from '../models/product.model.js';

const ProductDAO = {
    // Métodos existentes...
    getProducts: async (options) => {
        return productModel.paginate({}, options);
    },
    createProduct: async (productData) => {
        return productModel.create(productData);
    },
    updateProductById: async (productId, productData) => {
        return productModel.findByIdAndUpdate(productId, productData, { new: true });
    },
    deleteProductById: async (productId) => {
        return productModel.findByIdAndDelete(productId);
    },
    // Nuevo método
    getProductById: async (productId) => {
        return productModel.findById(productId);
    },
};

export default ProductDAO;