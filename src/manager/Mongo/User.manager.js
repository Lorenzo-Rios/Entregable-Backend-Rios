import { userModel } from '../../models/user.model.js'

class UserManagerMongo {
    constructor() {
        this.model = userModel
    }
}

export {
    UserManagerMongo
}