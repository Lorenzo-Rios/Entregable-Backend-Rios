import jwt from 'jsonwebtoken'
import { PRIVATE_ KEY } from '../utils/jsonwebtoken.js'

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']

    console.log(authHeader)

    if (!authHeader) return res.status(401).send({ status: 'error', error: 'not authenticated' })

    //split => Desarma el array en 2 posiciones ==> Bearer, "este es el token" ==> ['Bearer', 'token']
    const token = authHeader.split(' ')[1] 

    jwt.verify(token, PRIVATE_KEY, (error, userToken) => {
        req.user = userToken
        
        next()
    })
}

export {
    authTokenMiddleware
}
