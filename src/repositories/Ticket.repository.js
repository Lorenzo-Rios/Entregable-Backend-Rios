import { ticketModel } from '../models/ticket.model.js';  // Importa el modelo de Ticket
import { cartModel } from '../models/cart.model.js';
import  productRepository  from '../repositories/Product.repository.js';  // Si necesitas actualizar el stock

class TicketRepository {
    async getTickets(page = 1, limit = 10) {
        return await ticketModel.paginate({}, { page, limit });
    }

    async createTicket({ cartId, user, metodoDePago }) {
        const cart = await cartModel.findById(cartId).populate('products.product'); // Obtenemos el carrito con los productos

        if (!cart || cart.products.length === 0) {
            throw new Error('Cart is empty or not found');
        }

        const productsToPurchase = [];
        let total = 0;

        // Aquí recorremos los productos del carrito
        for (const item of cart.products) {
            const product = await productRepository.findProductById(item.product._id);

            if (!product) {
                throw new Error(`Product with ID ${item.product._id} not found`);
            }

            if (product.stock >= item.quantity) {
                productsToPurchase.push({
                    name: product.name,  // Asegúrate de que este campo se llama 'name' en tu producto
                    price: product.price,
                    quantity: item.quantity,
                });
                total += product.price * item.quantity;

                // Actualizar el stock del producto
                await productRepository.updateProductStock(product._id, product.stock - item.quantity);
            } else {
                console.warn(`Insufficient stock for product ${product.name}`);
            }
        }

        if (productsToPurchase.length === 0) {
            throw new Error('No products available to purchase');
        }

        // Crear los datos del ticket
        const ticketData = {
            orderId: cartId,  // Asociamos el ticket a la orden mediante el cartId
            createdAt: new Date(),  // Asignamos la fecha de creación
            user: {
                nombre: user.nombre,
                direccion: user.direccion,
                telefono: user.telefono,
            },
            metodoDePago,
            cart: {
                products: productsToPurchase,  // Productos comprados
                total,  // Total de la compra
            },
        };

        // Guardar el ticket en la base de datos
        const newTicket = await ticketModel.create(ticketData);

        // Vaciar el carrito después de generar el ticket
        cart.products = [];
        await cart.save();

        return newTicket;
    }
}

export const ticketRepository = new TicketRepository();