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

async function PostUser(req, res) {
    try {
        const { body } = req
    
        if (!body.first_name & !body.user_name & !body.email & !body.password){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }
        const response = await userModel.create(body)
    
        res.status(200).send({ data: response })
        
    } catch (error) {
        console.error('Error en PostUser:', error);
        res.status(500).send('Error posting Users');
    }
}

async function PutUser ( req, res ) {
    try {
        const { uid } = req.params
    
        let userToReplace = req.body
        if (!userToReplace.first_name & !userToReplace.user_name & !userToReplace.email & !userToReplace.password){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }
    
        const response = await userModel.updateOne({ _id: uid }, userToReplace)
        res.status(200).send({ status: 'success', message: 'Usuario actualizado con exito!', data: response })
    } catch (error) {
        console.error('Error en PutUser:', error);
        res.status(500).send('Error puting User');
    }
}

async function DeleteUser( req, res ) {
    try {
        const { uid } = req.params
        const response = await userModel.deleteOne({ _id: uid})

        res.status(200).send({ satus: 'success', message: 'Usuario borrado con exito!', data: response })
    } catch (error) {
        console.error('Error en DeleteUser:', error);
        res.status(500).send('Error deleting User');
    }
}

export {
    GetUser,
    PostUser,
    PutUser,
    DeleteUser
}