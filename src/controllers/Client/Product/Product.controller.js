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

async function PutProduct( req, res ) { 
    try {
        const { pid } = req.params
    
        let productToReplace = req.body
    
        if (!productToReplace.tittle || !productToReplace.stock || !productToReplace.price || !productToReplace.code){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }
        
        const response = await productModel.updateOne({ _id: pid }, productToReplace)
        
        res.status(200).send({ status: 'success', message: 'Producto actualizado con Exito!', data: response })
    } catch (error) {
        console.error('Error en PutProduct:', error);
        res.status(500).send('Error puting products');
    }

}

async function DeleteProduct( req, res) {
    try {
        const { pid } = req.params

        const response = await productModel.deleteOne({ _id: pid })
        res.status(200).send({ satus: 'success', message: 'Producto borrado con exito!', data: response })
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