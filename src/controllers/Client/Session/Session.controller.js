import { sessionModel } from "../../../models/session.model.js"

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
    
}

export {
    PostRegister,
    PostLogin
}