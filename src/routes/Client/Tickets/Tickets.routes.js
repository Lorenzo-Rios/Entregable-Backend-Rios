import { Router } from 'express';
import { createTicket } from '../../../controllers/Client/Ticket/Ticket.controller.js';

const router = Router();

// Ruta para crear el ticket
router.post('/ticket', createTicket);

export default router