const roleMiddleware = role => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next(); 
        }
        return res.status(403).json({ error: 'Acceso denegado. Rol insuficiente.' });
    };
};

export {
    roleMiddleware
}