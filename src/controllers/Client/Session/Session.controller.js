import { userRepository } from '../../../repositories/User.repository.js';
import { createHash, isValidPassword } from '../../../utils/bcrypt.js';
import { generateToken } from '../../../utils/jsonwebtoken.js';

async function GetGithub(req, res) {

}

async function GetGithubCallback(req, res) {
    req.session.user = req.user
    res.redirect('/products')
}

async function PostRegister(req, res) {
    const { first_name, last_name, user_name, email, password, phone } = req.body

    if (!user_name || !email || !password) {
        return res.send('Nombre de usuario y email obligatorios!').status(400)
    }

    const userFound = await userRepository.getUser( {email} )

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
    
        const response = await userRepository.create( newUser )

        res.redirect('/login')

    } catch (error) {
        console.error('Error en PostRegister', error)
        res.status(500).send('Error regristando usuario')
    }
}

async function GetFailRegister(req, res) {
    res.status(500).send({ status: 'error', message: 'Error en passport authenticate (fallo la estrategia del register)' })
}

async function PostLogin(req, res) {
    const { user_name, password } = req.body;

    const userFound = await userRepository.getUser({ user_name });

    if (!userFound) {
        return res.status(400).send({ status: 'error', message: 'El usuario no existe' });
    }

    if (!isValidPassword(password, userFound.password)) {
        return res.status(401).send({ status: 'error', message: 'Nombre de usuario o contraseña incorrectos' });
    }

    try {
        const token = generateToken({ 
            id: userFound._id, 
            role: userFound.role,
            user_name: userFound.user_name
        });

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24, // 1 día
            httpOnly: true,
            signed: true 
        }).send({
            status: 'success',
            data: userFound,
            token
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al iniciar sesión', error });
    }
}

async function GetFailLogin(req, res) {
    res.status(500).send({ status: 'error', message: 'Error en passport authenticate (fallo la estrategia del login)' })
}

async function GetData(req, res) {
    res.status(200).send({
        status: 'success',
        dataUser: req.user,
        message: 'Acceso autorizado. Aquí están los datos sensibles.'
    });
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

    const userFound = await userRepository.getUser({ user_name });

    if (!userFound) {
        return res.status(400).send({ status: 'error', error: 'El usuario no existe!' });
    }

    try {
        // Hashear la nueva contraseña
        const passwordHashed = createHash(newPassword);

        const result = await userRepository.update(userFound._id, { password: passwordHashed });

        if (result.modifiedCount === 0) {
            return res.status(400).send({ status: 'error', message: 'No se pudo actualizar la contraseña!' });
        }

        return res.status(200).send({ status: 'success', message: 'Contraseña actualizada con éxito!', data: result });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Error al actualizar la contraseña!', data: error.message });
    }
}

export {
    GetGithub,
    GetGithubCallback,
    PostRegister,
    GetFailRegister,
    PostLogin,
    GetFailLogin,
    PostChangePass,
    GetLogout,
    GetData
}