import { ticketRepository } from '../../../repositories/Ticket.repository.js';

async function getTicketById(req, res) {
    const ticketId = req.params;

    try {
        const ticket = await ticketRepository.GetTicketId(ticketId)

        if (!ticket) {
            return res.status(404).json({message: "ticket no encontrado"})
        } 
        
        res.status(200).json({
            message: 'success',
            ticket: ticket
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "error al obtener el ticket"})
    }
}

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

export { createTicket, getTicketById };