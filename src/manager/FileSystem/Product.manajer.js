import { productModel } from '../../models/product.model.js';

class ProductManager {
    // Obtener productos con paginación
    static async getProducts(page, limit) {
        const options = { page, limit };
        return productModel.paginate({}, options);
    }

    // Crear un nuevo producto
    static async createProduct(productData) {
        return productModel.create(productData);
    }

    // Actualizar un producto por ID
    static async updateProductById(productId, productData) {
        const product = await productModel.findById(productId);
        if (!product) throw new Error('Product not found');

        return productModel.updateOne({ _id: productId }, productData);
    }

    // Eliminar un producto por ID
    static async deleteProductById(productId) {
        const product = await productModel.findById(productId);
        if (!product) throw new Error('Product not found');

        return productModel.deleteOne({ _id: productId });
    }
}

export default ProductManager;