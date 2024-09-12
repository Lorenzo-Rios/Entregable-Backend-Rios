import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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

ordersSchema.plugin(mongoosePaginate)

const orderModel = model(ordersCollection, ordersSchema);

export {
    orderModel
}