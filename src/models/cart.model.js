import { Schema, model } from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            }
        }]
    }
})

const cartModel = model(cartsCollection, cartSchema)

export {
    cartModel
}
