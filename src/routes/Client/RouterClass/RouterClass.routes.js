import { Router } from 'express'

export default class RouterClass {
    constructor() {

    }

    applyCallbacks() {
        return callbacks.map(callbacks => async (...params) => {
            try {
                
            } catch (error) {
                console.log(error)
            }
        })
    }
    
    generateCustomResponse() {
        
    }

    get(path, ...callbacks) {
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
}