import passport from 'passport'
import { Strategy } from 'passport-local'
import GithubStrategy from 'passport-github2'
import { UserManagerMongo } from '../manager/Mongo/userManager.mongo.js'
import { createHash } from '../utils/bcrypt.js'

const userService = new UserManagerMongo()

const initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: 'Iv23lioB2bE5KgEVhzlZ',
        clientSecret: '29ca7d2a08df255c9b90a8e0cdc44ed45afc929e',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)

            let user = await userService.getUser({ email: profile._json.email })

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