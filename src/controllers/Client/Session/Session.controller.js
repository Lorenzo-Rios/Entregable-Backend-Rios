import { sessionModel } from "../../../models/session.model.js"
import { UserManagerMongo } from "../../../manager/Mongo/userManager.mongo.js"
import { createHash, isValidPassword } from "../../../utils/bcrypt.js"

const userService = new UserManagerMongo()

async function PostRegister(req, res) {
    const { first_name, last_name, user_name, email, password, phone } = req.body

    if (!user_name || !email || !password) {
        return res.send('Nombre de usuario y email obligatorios!').status(400)
    }

    const userFound = await userService.getUser( {email} )

    if (userFound) {
        return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
    }
    
    try {
        const newUser = {
            first_name,
            last_name,
            user_name,
            email,
            password: createHash(password),
            phone
        }
    
        const response = await userService.createUser( newUser )

        res.redirect('/login').status({ status: 'success', data: response })

    } catch (error) {
        console.error('Error en PostRegister', error)
        res.status(500).send('Error regristando usuario')
    }
}

async function PostLogin(req, res) {
    const { user_name, password } = req.body

    const userFound = await userService.getUser({ user_name })

    if ( !userFound ) {
        return res.status(400).send({status:'error', message: 'el usuario no existe'})
    }

    if ( userFound.user_name != user_name || !isValidPassword( password, userFound.password ) ) {
        return res.status(401).send({status:'error', message: 'user name o password incorrectos'})
    }

    try {     
        req.session.user = {
            user_name,
            isAdmin: userFound.role === 'admin'
        }
        res.send('logeado correctamente')       
    } catch (error) {
        res.status(403).send({ message:'Error al logearse', data: {error} })
    }
}

async function GetLogout(req, res) {
    req.session.destroy(error => {
        if(error) return res.send({status: 'error', data: {error}})
    })
    res.send('logout')
}

async function PostChangePass(req, res) {
    const { user_name, newPassword } = req.body;

    if (!user_name || !newPassword) {
        return res.status(400).send({ status: 'error', message: 'El usuario y la nueva contraseña son requeridos.' });
    }

    const userFound = await userService.getUser({ user_name });

    if (!userFound) {
        return res.status(400).send({ status: 'error', error: 'El usuario no existe!' });
    }

    try {
        // Hashear la nueva contraseña
        const passwordHashed = createHash(newPassword);

        const result = await userService.updateUser(userFound._id, { password: passwordHashed });

        // Verificar si se actualizó el documento
        if (result.modifiedCount === 0) {
            return res.status(400).send({ status: 'error', message: 'No se pudo actualizar la contraseña!' });
        }

        return res.status(200).send({ status: 'success', message: 'Contraseña actualizada con éxito!', data: result });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Error al actualizar la contraseña!', data: error.message });
    }
}

async function GetData(req, res) {
    res.send('datos sensibles')
}

export {
    PostRegister,
    PostLogin,
    GetLogout,
    GetData,
    PostChangePass
}