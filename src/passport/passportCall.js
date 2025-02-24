import passport from "passport";

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);

            if (!user) {
                // Si no hay token o es inválido
                const message = 'No estás autenticado. Por favor, inicia sesión.';
                return res.status(401).json({ error: message });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};

export {
    passportCall
};