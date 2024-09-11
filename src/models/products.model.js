import { Schema, model } from 'mongoose'

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

const productModel = model(productsCollection, productsSchema);

export {
    productModel
}