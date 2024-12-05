import ProductDAO from '../mongo/Product.dao.js';

const ProductRepository = {
    // Métodos existentes...
    getProducts: async (page, limit) => {
        const options = { page, limit, lean: true };
        return await ProductDAO.getProducts(options);
    },
    createProduct: async (productData) => {
        return await ProductDAO.createProduct(productData);
    },
    updateProduct: async (productId, productData) => {
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
    // Nuevo método
    getProductById: async (productId) => {
        const product = await ProductDAO.getProductById(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    },
};

export default ProductRepository;