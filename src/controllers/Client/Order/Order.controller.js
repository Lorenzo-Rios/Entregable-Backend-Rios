import { orderRepository } from '../../../repositories/Order.repository.js'
import { ticketRepository } from '../../../repositories/Ticket.repository.js'

async function GetOrder(req, res) {
    try {
        const orders = await orderRepository.getOrders(1, 10);
        res.send({ status: 'success', payload: orders });
    } catch (error) {
        console.error('Error en GetOrder:', error);
        res.status(500).send('Error fetching Orders');
    }
}

async function PostOrder(req, res) {
    const { cartId, user, metodoDePago } = req.body;

    try {
        const order = await orderRepository.createOrder({ cartId, user, metodoDePago });

        const ticket = await ticketRepository.createTicket({
            cartId,
            user,
            metodoDePago,
            orderId: order._id // Vincula ticket con la orden
        });

        res.status(200).json({
            message: 'Orden y ticket generados con éxito!',
            order,
            ticket
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al generar la orden y el ticket', error: err.message });
    }
}


async function PutOrder(req, res) {
    const { oid } = req.params;
    const updates = req.body;

    try {
        const response = await orderRepository.updateOrder(oid, updates);
        res.status(200).send({ status: 'success', message: 'Orden actualizada con éxito!', data: response });
    } catch (error) {
        console.error('Error en PutOrder:', error);
        res.status(500).send('Error actualizando la orden');
    }
}

async function DeleteOrder(req, res) {
    const { oid } = req.params;

    try {
        const response = await orderRepository.deleteOrder(oid);
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