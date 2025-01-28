import { ticketModel } from '../models/ticket.model.js'; 
import { cartModel } from '../models/cart.model.js'; 

class TicketRepository {
    async GetTicketId ({ ticketId }) {
        try {
            const ticket = await ticketModel.findById(ticketId);  
    
            return ticket;
        } catch (error) {
            console.error('Error al buscar el ticket:', error);
            throw new Error('Error al buscar el ticket');
        }
    }

    async createTicket({ cartId, user, metodoDePago, orderId }) {
        // Recuperar los datos del carrito
        const cart = await cartModel.findById(cartId).populate('products.product');

        if (!cart || cart.products.length === 0) {
            throw new Error('El carrito está vacío o no encontrado');
        }

        const productsToPurchase = [];
        let total = 0;

        for (const item of cart.products) {
            const product = item.product;
            if (!product) {
                throw new Error(`Producto con ID ${item.product._id} no encontrado`);
            }

            productsToPurchase.push({
                tittle: product.tittle,
                price: product.price,
                quantity: item.quantity,
            });

            total += product.price * item.quantity;
        }

        const ticketData = {
            orderId,
            createdAt: new Date(),
            user: {
                nombre: user.nombre,
                direccion: user.direccion,
                telefono: user.telefono,
            },
            metodoDePago,
            cart: {
                products: productsToPurchase, // Productos transformados
                total,
            },
        };

        // Crear el ticket en la base de datos
        const newTicket = await ticketModel.create(ticketData);

        // Vaciar el carrito después de crear el ticket
        cart.products = [];
        await cart.save();

        return newTicket;
    }
}

export const ticketRepository = new TicketRepository();