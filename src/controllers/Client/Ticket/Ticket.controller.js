import { ticketRepository } from '../../../repositories/Ticket.repository.js';

async function createTicket(req, res) {
    const { cartId, user, metodoDePago } = req.body;

    try {
        const newTicket = await ticketRepository.createTicket({
            cartId,   // ID del carrito que se obtiene desde la creación de la orden
            user,     // Datos del usuario
            metodoDePago  // Método de pago
        });

        res.status(200).json({
            message: 'Ticket generado con éxito!',
            ticket: newTicket
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al generar el ticket', error: err.message });
    }
}

export { createTicket };