import ProductRepository from '../repositories/Product.repository.js';

const ProductService = {
    getProducts: async (page, limit) => {
        const result = await ProductRepository.getProducts(page, limit);
        if (!result.docs || result.docs.length === 0) {
            throw new Error('No se encontraron productos');
        }
        return result;
    },
    createProduct: async (productData) => {
        // Validar campos requeridos
        if (!productData.tittle || !productData.description || !productData.stock || !productData.price || !productData.code) {
            throw new Error('Faltan datos requeridos para crear un producto');
        }
        return await ProductRepository.createProduct(productData);
    },
    updateProduct: async (productId, productData) => {
        if (!productData.tittle || !productData.description || !productData.stock || !productData.price || !productData.code) {
            throw new Error('Faltan datos requeridos para actualizar el producto');
        }
        return await ProductRepository.updateProduct(productId, productData);
    },
    deleteProduct: async (productId) => {
        return await ProductRepository.deleteProduct(productId);
    },
};

export default ProductService;