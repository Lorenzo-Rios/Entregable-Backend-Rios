import { RouterClass } from '../RouterClass/RouterClass.routes.js'

export default class UserRouter extends RouterClass {


    init() {
        this.get('/', (req, res) => {
            res.send('Get Users')
        })
    }
}