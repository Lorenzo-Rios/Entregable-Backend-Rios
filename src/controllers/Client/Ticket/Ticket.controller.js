import { ticketRepository } from '../../../repositories/Ticket.repository.js';

async function createTicket(req, res) {
    const { cartId, user, metodoDePago } = req.body;

    try {
        // Llamamos al repositorio para crear el ticket
        const ticket = await ticketRepository.createTicket({ cartId, user, metodoDePago });

        // Enviamos la respuesta al frontend con el ticket creado
        res.status(200).json({
            message: 'Ticket creado con éxito!',
            ticket
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el ticket', error: err.message });
    }
}

export { createTicket };