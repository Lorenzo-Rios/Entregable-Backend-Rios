import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ordersCollection = 'orders'

const orderSchema = new Schema ({
    user: {
        nombre: {
            type: String
        },

        direccion: {
            type: String
        },

        telefono: {
            type: Number
        }
    },

    metodoDePago: {
        type: String,
        enum: ['Efectivo', 'Mercado pago']
    },

    cart: {
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },

                price: {
                    type: Number
                },

                quantity: {
                    type: Number,
                    default: 1
                }

            }
        ]
    },

    estado: {
        type: String,
        enum: ['Pendiente', 'En camino', 'Realizada', 'Cancelada'],
        default: 'Pendiente'
    }
})

orderSchema.plugin(mongoosePaginate)

const orderModel = model(ordersCollection, orderSchema);

export {
    orderModel
}