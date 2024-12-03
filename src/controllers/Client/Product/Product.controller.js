import ProductManager from "../../../manager/FileSystem/Product.manajer.js";

async function GetProduct(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const result = await ProductManager.getProducts(pageNumber, limitNumber);

        if (!result.docs || result.docs.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No products found',
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
            prevLink: result.hasPrevPage
                ? `/products?page=${result.prevPage}&limit=${limitNumber}`
                : null,
            nextLink: result.hasNextPage
                ? `/products?page=${result.nextPage}&limit=${limitNumber}`
                : null,
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

        const response = await ProductManager.createProduct(body);

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

        const response = await ProductManager.updateProductById(pid, productToReplace);

        if (response.nModified === 0) {
            return res.status(400).send({ status: 'error', error: 'No se actualizó ningún producto. Verifique los datos enviados.' });
        }

        res.status(200).send({ status: 'success', message: 'Producto actualizado con éxito!', data: response });
    } catch (error) {
        console.error('Error en PutProduct:', error);
        res.status(500).send('Error al actualizar el producto');
    }
}

async function DeleteProduct(req, res) {
    try {
        const { pid } = req.params;

        await ProductManager.deleteProductById(pid);

        res.status(200).send({ status: 'success', message: 'Producto borrado con exito!' });
    } catch (error) {
        console.error('Error en DeleteProduct:', error);
        res.status(500).send('Error deleting products');
    }
}

export {
    GetProduct,
    PostProduct,
    PutProduct,
    DeleteProduct,
};