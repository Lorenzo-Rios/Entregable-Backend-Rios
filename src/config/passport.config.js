import passport from 'passport'
import { Strategy } from 'passport-local'
import { UserManagerMongo } from '../manager/Mongo/userManager.mongo.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'

const userService = new UserManagerMongo()

const initializePassport = () => {
    passport.use('register', new Strategy( {
        passReqToCallback: true,
        usernameField: 'user_name'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, phone } = req.body

        if (!first_name || !email || !username || !password) {
            return done(null, false)
        }

        const userFound = await userService.getUser({ user_name: username })

        if(userFound) return done(null, false)
        
        try {
            let newUser = {
                first_name,
                last_name,
                user_name: username,
                email,
                password: createHash(password),
                phone
            }

            let result = await userService.createUser(newUser)

            return done(null, result)
        } catch (error) {
            return done('Error al registrarse' +error )
        }

    }))
    passport.use('login', new Strategy( {
        usernameField: 'user_name'
    }, async ( username, password, done) => {
        try {
            const userFound = await userService.getUser({ user_name: username })

            if(!userFound) return done(null, false)

            if(!isValidPassword(password, userFound.password)) return done(null, false)

            return done(null, userFound)
        } catch (error) {
            return done('Error al logearse' +error)
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