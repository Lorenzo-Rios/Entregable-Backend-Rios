import { Router } from 'express';
import { createTicket, getTicketById } from '../../../controllers/Client/Ticket/Ticket.controller.js';

const router = Router();

router.get('/:ticketId', getTicketById)
router.post('/', createTicket);

export default router