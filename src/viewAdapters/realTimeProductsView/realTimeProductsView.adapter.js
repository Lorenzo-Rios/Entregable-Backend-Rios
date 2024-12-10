import  ProductService  from '../../services/Product.service.js';

export const realTimeProductsViewAdapter = {
    async getRealTimeProducts() {
        try {
            const products = await ProductService.getProducts(1, 10); // Límite y paginación
            return { products: products.docs };
        } catch (error) {
            console.error('Error en realTimeProductsViewAdapter:', error);
            throw error;
        }
    }
};