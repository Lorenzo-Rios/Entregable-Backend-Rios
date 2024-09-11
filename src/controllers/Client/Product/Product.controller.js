import { productModel } from '../../../models/products.model.js'

async function GetProduct ( req, res ) {
    try {
        const products = await productModel.find()
        res.send({ status: 'succes', payload: products})
    } catch (error) {
        console.error('Error en GetProduct:', error);
        res.status(500).send('Error fetching products');
    }
}

async function GetProductId ( req, res ) {
    try {
        const products = await productModel.find({ pid: { _id: `${req}`} })
        res.send({ status: 'succes', payload: products})
    } catch (error) {
        console.error('Error en GetProduct:', error);
        res.status(500).send('Error fetching products');
    }
}

async function PostProduct ( req, res ) {
    try {
        const { body } = req
    
        if (!body.tittle & !body.stock & !body.price & !body.code){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }
        const response = await productModel.create(body)
    
        res.status(200).send({ status: 'success', data: response })
        
    } catch (error) {
        console.error('Error en PostUser:', error);
        res.status(500).send('Error posting products');
    }
}

/*async function PostProduct(req, res) {
    try {
        const products = await readProducts();
        const newProduct = {
            id: (products.length + 1).toString(),
            ...req.body
        };

        if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.thumbnail || !newProduct.stock) {
            throw new Error('Faltan campos en la solicitud');
        }

        products.push(newProduct);
        await writeProducts(products);
        res.status(201).json(newProduct);
        req.io.emit('productList', products); 
    } catch (error) {
        console.error('Error en PostProduct:', error);
        res.status(500).send('Error creating product');
    }
}

async function DeleteProduct(req, res) {
    try {
        const { id } = req.params;
        let products = await readProducts();

        products = products.filter(product => product.id != id);

        await writeProducts(products);

        res.status(200).send('Producto eliminado')
        req.io.emit('productList', products);
    } catch (error) {
        console.log('Error en DeleteProduct'); 
        res.status(500).send('Error en borrar el producto');
    }
}*/

export {
    GetProduct,
    GetProductId,
    PostProduct
};