import { connect } from 'mongoose'
import dotenv from 'dotenv'
import { program } from '../utils/commander.js'

const { mode } = program.opts()

dotenv.config({
    path:   mode==='development' ? './.env.development' : './.env.production'
})

console.log(mode)

export const configObjet = {
    port: process.env.SERVER_PORT || 8080,
    private_key: process.env.PRIVATE_KEY
}

const db = async () => {
    console.log('Base de datos conectada')
    return await connect(process.env.MONGO_URL)
}

export default db
