import { passportCall } from '../passport/passportCall.js';

export const checkAuthAndRole = (requiredRole) => (req, res, next) => {
    // Usamos passportCall para verificar el JWT
    passportCall('jwt')(req, res, (err) => {
        if (err || !req.user) {
            return res.status(401).send({ 
                status: 'error', 
                message: 'No estás autenticado. Por favor, inicia sesión.' 
            });
        }

        // Si se requiere un rol específico, verificamos el rol
        if (requiredRole && req.user.role !== requiredRole) {
            return res.status(403).send({ 
                status: 'error', 
                message: 'No tienes permisos para realizar esta acción.' 
            });
        }

        next(); // Todo está bien, continuamos
    });
};