import { Schema, model } from 'mongoose'

const usersCollection = 'users'

const usersSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String
    },

    user_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    }
})

const userModel = model(usersCollection, usersSchema)

export {
    userModel
}
