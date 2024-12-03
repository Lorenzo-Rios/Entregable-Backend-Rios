import { productModel } from "../models/product.model.js";

const ProductDAO = {
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
};

export default ProductDAO;