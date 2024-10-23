import { productModel } from '../../../models/product.model.js';

async function GetProduct(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        // Configuración de opciones para la paginación
        const options = {
            page: pageNumber,
            limit: limitNumber,
        };

        // Aplicar paginación usando los valores de page y limit
        const result = await productModel.paginate({}, options);

        // Verifica si result.docs tiene productos y responde adecuadamente
        if (!result.docs || result.docs.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No products found'
            });
        }

        res.send({
            status: 'success',
            payload: result.docs,  
            totalPages: result.totalPages,
            currentPage: result.page, 
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limitNumber}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limitNumber}` : null
        });
    } catch (error) {
        console.error('Error en GetProduct:', error);
        res.status(500).send('Error fetching products');
    }
}

async function PostProduct(req, res) {
    try {
        const { body } = req;

        if (!body.tittle || !body.description || !body.stock || !body.price || !body.code) {
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!' });
        }

        const response = await productModel.create(body);
        
        res.status(200).send({ status: 'success', data: response });
    } catch (error) {
        console.error('Error en PostProduct:', error);
        res.status(500).send('Error posting products');
    }
}

async function PutProduct(req, res) {
    try {
        const { pid } = req.params;
        const productToReplace = req.body;

        if (!productToReplace.tittle || !productToReplace.description || !productToReplace.stock || !productToReplace.price || !productToReplace.code) {
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!' });
        }

        const response = await productModel.updateOne({ _id: pid }, productToReplace);
        res.status(200).send({ status: 'success', message: 'Producto actualizado con Exito!', data: response });
    } catch (error) {
        console.error('Error en PutProduct:', error);
        res.status(500).send('Error updating products');
    }
}

async function DeleteProduct(req, res) {
    try {
        const { pid } = req.params;
        const response = await productModel.deleteOne({ _id: pid });
        res.status(200).send({ status: 'success', message: 'Producto borrado con exito!', data: response });
    } catch (error) {
        console.error('Error en DeleteProduct:', error);
        res.status(500).send('Error deleting products');
    }
}

export {
    GetProduct,
    PostProduct,
    PutProduct,
    DeleteProduct
};