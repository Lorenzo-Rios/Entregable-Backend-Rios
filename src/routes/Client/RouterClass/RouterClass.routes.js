import { Router } from 'express'
import 'dotenv/config'

class RouterClass {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter () {
        return this.router
    }

    init () {
    
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callbacks => async (...params) => {
            try {
                await callbacks.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }
    
    generateCustomResponse(req, res, next) {
        res.sendSuccess     = data => res.send({status: 'success', data})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError   = error => res.send({status: 'error', error})
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()
        const authHeaders = req.headers.authorization
        if(!authHeaders) return res.status(401).send({status: 'error', error: 'not permisions'})
        
        let token = authHeaders.split(' ')[1]
        let user = jwt.verify(token, process.env.PRIVATE_KEY) 

        if(!policies.includes(user.role.toUpperCase())) return res.status(401).send({status: 'error', error: 'not permisions'})

        req.user = user
        next()
    }

    get(path, policies,...callbacks) { //[ 'public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    post(path, policies,...callbacks) { //[ 'public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    put(path, policies,...callbacks) { //[ 'public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    delete(path, policies,...callbacks) { //[ 'public', 'user']
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
}

export {
    RouterClass
}