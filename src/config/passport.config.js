import passport from 'passport'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { userRepository } from '../repositories/User.repository.js'
import { createHash } from '../utils/bcrypt.js'
import { configObjet } from '../server/connection.db.js'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const initializePassport = () => {

    const cookieExtractor = (req) => {
        let token = null;
    
        if (req && req.signedCookies) {
            token = req.signedCookies['token']; 
        }
        return token;
    };

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: configObjet.private_key
            },
            async (jwt_payload, done) => {
                try {
                    // Si el token es válido, continúa
                    return done(null, jwt_payload);
                } catch (error) {
                    // Manejo explícito de errores
                    return done(null, false, { message: 'Token inválido o no proporcionado.' });
                }
            }
        )
    );

    passport.use('github', new GithubStrategy({
        clientID: 'Iv23lioB2bE5KgEVhzlZ',
        clientSecret: '29ca7d2a08df255c9b90a8e0cdc44ed45afc929e',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)

            let user = await userRepository.getUser({ email: profile._json.email })

            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    user_name: profile.username,
                    email: profile._json.email,
                    password: createHash('1234')
                }
                let result = await userService.createUser(newUser)    
                
                return done(null, result)
            }

            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser( async (id, done) => {
        let user = await userService.getUser({ _id: id})

        done(null, user)
    })
}

export {
    initializePassport
}