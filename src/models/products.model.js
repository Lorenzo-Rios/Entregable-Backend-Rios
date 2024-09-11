import { Schema, model } from 'mongoose'

const productsCollection = 'products'

const productsSchema = new Schema ({
    type: String
})

const productModel = model(productsCollection, productsSchema);

export {
    productModel
}