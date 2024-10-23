const authentication = (req, res , next) => {
    if (req.session.user.user_name !== 'lolito_pincha' || req.session.user.isAdmin) {
        return res.status(401).send('Error de auntenticacion')
    }

    next()
}

export {
    authentication
}