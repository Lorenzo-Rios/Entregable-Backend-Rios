import jwt from 'jsonwebtoken'
import { configObjet } from '../server/connection.db.js'

const generateToken = user => jwt.sign(user, configObjet.private_key, {expiresIn: '1d'})

export {
    generateToken
}