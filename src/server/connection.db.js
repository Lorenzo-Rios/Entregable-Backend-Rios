import { connect } from 'mongoose'

const db = async () => {
    console.log('Base de datos conectada');
    return await connect('mongodb+srv://Lorenzo:lorenzorios123.@app-eccomerce.hnbuh.mongodb.net/database?retryWrites=true&w=majority&appName=App-Eccomerce') 
}

export default db