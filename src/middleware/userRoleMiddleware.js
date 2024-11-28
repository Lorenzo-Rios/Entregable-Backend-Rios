const userRoleMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        return next(); 
    }
    return res.status(403).json({ error: 'Acceso denegado. Solo usuarios pueden acceder.' });
};

export {
    userRoleMiddleware
};