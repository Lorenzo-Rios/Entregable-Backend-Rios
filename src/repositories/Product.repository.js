import ProductDAO from '../dao/Product.dao.js';

const ProductRepository = {
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
};

export default ProductRepository;