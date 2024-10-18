import { connect } from 'mongoose'
import 'dotenv/config'

const db = async () => {
    console.log('Base de datos conectada');
    return await connect(process.env.MONGO_URL) 
}

export default db