import { productModel } from '../../models/product.model.js';

const ProductDAO = {
    // Métodos
    getProducts: async (options, filter = {}) => {
        return productModel.paginate(filter, options);
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
    getProductById: async (productId) => {
        return productModel.findById(productId);
    },
};

export default ProductDAO;