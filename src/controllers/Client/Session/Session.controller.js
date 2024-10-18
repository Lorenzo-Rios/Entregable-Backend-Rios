import { sessionModel } from "../../../models/session.model.js"
import { UserManagerMongo } from "../../../manager/Mongo/User.manager.js"
import { userModel } from "../../../models/user.model.js"

async function PostRegister(req, res) {
    const { body } = req

    const response = await sessionModel.create(body)

    res.status(200).send({ data: response })

    try {
        
    } catch (error) {
        console.error('Error en PostRegister', error)
        res.status(500).send('Error regristando usuario')
    }
}

async function PostLogin(req, res) {
    const { user_name, password } = req.body

    if (!user_name != "lolito_pincha" || !password != "1234") {
        return res.send({status:'error', message: 'el usuario no existe'})
    }

    req.session.user_name = user_name
    req.session.admin = true

    res.send('logeado correctamente')
}

async function GetLogout(req, res) {
    req.session.destroy(error => {
        if(error) return res.send({status: 'error', data: {error}})
    })
    res.send('logout')
}

export {
    PostRegister,
    PostLogin,
    GetLogout
}