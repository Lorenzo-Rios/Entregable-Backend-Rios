import { Schema, model } from 'mongoose'

const sessionsCollection = 'sessions'

const sessionSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const sessionModel = model (sessionsCollection, sessionSchema)

export {
    sessionModel
}