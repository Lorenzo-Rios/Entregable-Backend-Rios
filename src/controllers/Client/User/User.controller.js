import { userModel } from '../../../models/users.model.js'

async function GetUser(req, res) {
    try {
        const users = await userModel.find();
        res.send ({ status: 'succes', payload: users });    
    } catch (error) {
        console.error('Error en GetUser:', error);
        res.status(500).send('Error fetching Users');  
    }
}

export {
    GetUser
}