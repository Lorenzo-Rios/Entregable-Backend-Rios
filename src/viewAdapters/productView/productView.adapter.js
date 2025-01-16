import productService from '../../repositories/Product.repository.js';

class ProductViewAdapter {
    async getPaginatedProducts(page, limit) {
        const products = await productService.getPaginatedProducts({}, { page, limit });
        return {
            products: products.docs,
            totalPages: products.totalPages,
            currentPage: products.page,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&limit=${limit}` : null,
        };
    }
}

export const productViewAdapter = new ProductViewAdapter();