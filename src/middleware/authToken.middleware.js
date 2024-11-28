import jwt from 'jsonwebtoken';
import 'dotenv/config';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.redirect('/login'); // Redirige a la página de login si no está autenticado
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (error, userToken) => {
        if (error || userToken.role !== 'admin') {
            return res.status(403).send('Not authorized'); // Mensaje de error si no es admin
        }
        
        req.user = userToken;
        next();
    });
};

export { 
    authTokenMiddleware 
}