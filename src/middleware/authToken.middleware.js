import jwt from 'jsonwebtoken';
import { configObjet } from '../server/connection.db.js'

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).render('error', {
            message: 'No estás autenticado. Por favor, inicia sesión.',
            link: '/login',
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, configObjet.private_key, (error, userToken) => {
        if (error) {
            return res.status(403).render('error', {
                message: 'Token inválido o expirado. Por favor, inicia sesión nuevamente.',
                link: '/login',
            });
        }

        // Guarda el usuario decodificado en la solicitud
        req.user = userToken;
        next();
    });
};

export { authTokenMiddleware };