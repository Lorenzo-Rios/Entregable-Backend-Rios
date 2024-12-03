const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({error: 'Unauthorized!', message: 'User not loged!'})
        if (req.user && req.user.role !== role) return res.status(401).send({error: 'Denegaded!', message: 'Rol unauthorized!'})
        next()
    };
};

export {
    authorization
}