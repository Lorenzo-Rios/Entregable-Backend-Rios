import passport from "passport";

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err);

            if (!user) {
                // Si no hay usuario, enviamos un error más claro
                if (info && info.message) {
                    return res.status(401).json({ error: info.message });
                }
                return res.status(401).json({ error: 'No estás logeado' });
            }

            req.user = user;  
            next();  
        })(req, res, next);
    };
};

export {
    passportCall
};