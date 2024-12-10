import { orderService } from '../../../services/Order.service.js';

async function GetOrder(req, res) {
    try {
        const orders = await orderService.getOrders(1, 10);
        res.send({ status: 'success', payload: orders });
    } catch (error) {
        console.error('Error en GetOrder:', error);
        res.status(500).send('Error fetching Orders');
    }
}

async function PostOrder(req, res) {
    const { cartId, user, metodoDePago } = req.body;

    try {
        const order = await orderService.createOrder({ cartId, user, metodoDePago });
        res.status(200).json({ message: 'Orden generada con éxito!', order });
    } catch (err) {
        res.status(500).json({ message: 'Error al generar la orden!', error: err.message });
    }
}

async function PutOrder(req, res) {
    const { oid } = req.params;
    const updates = req.body;

    try {
        const response = await orderService.updateOrder(oid, updates);
        res.status(200).send({ status: 'success', message: 'Orden actualizada con éxito!', data: response });
    } catch (error) {
        console.error('Error en PutOrder:', error);
        res.status(500).send('Error actualizando la orden');
    }
}

async function DeleteOrder(req, res) {
    const { oid } = req.params;

    try {
        const response = await orderService.deleteOrder(oid);
        res.status(200).send({ status: 'success', message: 'Orden borrada con éxito!', data: response });
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
};