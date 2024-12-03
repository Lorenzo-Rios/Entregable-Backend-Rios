import { Router } from 'express'

export default class RouterClass {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter () {
        return this.router
    }

    init () {
    
    }

    applyCallbacks() {
        return callbacks.map(callbacks => async (...params) => {
            try {
                await callbacks.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }
    
    generateCustomResponse() {
        
    }

    get(path, ...callbacks) {
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
}