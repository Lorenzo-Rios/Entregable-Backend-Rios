import ProductDAO from '../mongo/Product/Product.dao.js';

const ProductRepository = {
    getProducts: async (page, limit) => {
        const options = { page, limit, lean: true };
        return await ProductDAO.getProducts(options);
    },

    createProduct: async (productData) => {
        if (!productData.tittle || !productData.description || !productData.stock || !productData.price || !productData.code) {
            throw new Error('Faltan datos requeridos para crear un producto');
        }
        return await ProductDAO.createProduct(productData);
    },

    updateProduct: async (productId, productData) => {
        if (!productData.tittle || !productData.description || !productData.stock || !productData.price || !productData.code) {
            throw new Error('Faltan datos requeridos para actualizar el producto');
        }
        const updatedProduct = await ProductDAO.updateProductById(productId, productData);
        if (!updatedProduct) {
            throw new Error('Producto no encontrado para actualizar');
        }
        return updatedProduct;
    },

    deleteProduct: async (productId) => {
        const deletedProduct = await ProductDAO.deleteProductById(productId);
        if (!deletedProduct) {
            throw new Error('Producto no encontrado para eliminar');
        }
        return deletedProduct;
    },

    getPaginatedProducts: async (filter, options) => {
        return await ProductDAO.getProducts({ ...options, lean: true });
    },

    findProductById: async (productId) => {
        return await ProductDAO.getProductById(productId);
    },

    updateProductStock: async (productId, newStock) => {
        return await ProductDAO.updateProductStock(productId, newStock);
    }
};

export default ProductRepository;