import { Schema, model } from 'mongoose';

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders', // Referencia al modelo de órdenes
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        nombre: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        telefono: {
            type: Number,
            required: true,
        },
    },
    metodoDePago: {
        type: String,
        required: true,
    },
    cart: {
        products: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        total: {
            type: Number,
            required: true,
        },
    },
});

const ticketModel = model(ticketsCollection, ticketSchema);

export { ticketModel };