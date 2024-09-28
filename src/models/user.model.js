import { Schema, model } from 'mongoose'

const usersCollection = 'users'

const userSchema = new Schema ({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        type: String
    },
    user_name: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    phone: {
        unique: true,
        type: Number
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const userModel = model(usersCollection, userSchema)

export {
    userModel
}
