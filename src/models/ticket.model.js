import { Schema, model } from 'mongoose';

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        nombre: {
            type: String
        },
        direccion: {
            type: String
        },
        telefono: {
            type: Number
        },
    },
    metodoDePago: {
        type: String,
        enum: ['Efectivo', 'Mercado pago']
    },
    cart: {
        products: [
            {
                tittle: {
                    type: String
                },
                price: {
                    type: Number
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            },
        ],
        total: {
            type: Number
        },
    },
});

const ticketModel = model(ticketsCollection, ticketSchema);

export { ticketModel };