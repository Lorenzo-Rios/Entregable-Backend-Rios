import { UserManagerMongo } from "../../../manager/Mongo/userManager.mongo.js"
import { createHash } from "../../../utils/bcrypt.js"

const userService = new UserManagerMongo()

async function PostRegister(req, res) {
    res.status(200).send({ status: 'success', message: 'Registrado con exito!' })
}

async function GetFailRegister(req, res) {
    res.status(500).send({ status: 'error', message: 'Error en passport authenticate (fallo la estrategia del register)' })
}

async function PostLogin(req, res) {
    if (!req.user) return res.status(401).send({ status: 'error', message: 'Credenciales invalidas' })

    req.session.user = {
        user_name: req.user.user_name
    }

    res.status(200).send({ status: 'success', message: 'Logeado con exito!' })
}

async function GetFailLogin(req, res) {
    res.status(500).send({ status: 'error', message: 'Error en passport authenticate (fallo la estrategia del login)' })
}

async function GetData(req, res) {
    res.send('datos sensibles')
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

export {
    PostRegister,
    GetFailRegister,
    PostLogin,
    GetFailLogin,
    PostChangePass,
    GetLogout,
    GetData
}