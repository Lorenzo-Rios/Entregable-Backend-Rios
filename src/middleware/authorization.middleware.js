const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({error: 'Error', message: 'User not loged!'})
        if (req.user && req.user.role !== role) return res.status(401).send({error: 'Rol unauthorized!', message: 'Denegaded!'})
        next()
    };
};

export {
    authorization
}