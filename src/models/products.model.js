import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products'

const productsSchema = new Schema ({
    tittle: {
        type: String,
        unique: true,
        required: true
    },

    description: {
        type: String,
    },

    stock: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    }
})

productsSchema.plugin(mongoosePaginate);

const productModel = model(productsCollection, productsSchema);

export {
    productModel
}