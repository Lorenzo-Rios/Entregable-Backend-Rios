import { Schema, model } from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});
