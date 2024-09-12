import { orderModel } from '../../../models/order.model.js'

async function GetOrder ( req, res ) {
    try {
        const orders = await orderModel.find()
        res.send({ status: 'success', payload: orders })
    } catch (error) {
        console.error('Error en GetOrder:', error);
        res.status(500).send('Error fetching Orders');
    }
}

async function PostOrder ( req, res ) {
    try {
        const { body } = req
    
        if (!body.name || !body.price || !body.quantity ){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }

        const response = await orderModel.create(body)

        res.status(200).send({ data: response })
    } catch (error) {
        console.error('Error en PostOrder:', error);
        res.status(500).send('Error posting Order');
    }
}

async function PutOrder ( req, res ) {
    try {
        const { oid } = req.params

        let orderToReplace = req.body

        if (!orderToReplace.name || !orderToReplace.price || !orderToReplace.quantity ){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }

        const response = await orderModel.updateOne({ _id: oid })
        res.status(200).send({ status: 'success', message: 'Orden actualizada con exito!', data: response })
    } catch (error) {
        console.error('Error en PutOrder:', error);
        res.status(500).send('Error puting Order');
    }
}

async function DeleteOrder ( req, res ) {
    try {
        const { oid } = req.params

        const response = await orderModel.deleteOne({ _id: oid })

        res.status(200).send({ status: 'success', message: 'Orden borrada con exito!', data: response })
    } catch (error) {
        console.error('Error en DeleteOrder:', error);
        res.status(500).send('Error deleting order');
    }
}

export {
    GetOrder,
    PostOrder,
    PutOrder,
    DeleteOrder
}