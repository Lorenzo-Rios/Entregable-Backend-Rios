import { Schema, model } from 'mongoose'

const ordersCollection = 'orders'

const ordersSchema = new Schema ({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },

    price:{
        type: Number
    }
})

const orderModel = model(ordersCollection, ordersSchema);

export {
    orderModel
}