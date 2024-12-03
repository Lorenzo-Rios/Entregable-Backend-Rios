const authMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Debes estar logueado para realizar esta acción.' });
    }
    next();
};

export {
    authMiddleware
}