import jwt from 'jsonwebtoken'
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY

const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '1d'})

export {
    generateToken,
    PRIVATE_KEY
}