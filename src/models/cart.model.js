import { Schema, model } from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new Schema({
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
})

const cartModel = model(cartsCollection, cartSchema)

export {
    cartModel
}
