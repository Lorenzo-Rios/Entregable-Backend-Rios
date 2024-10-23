import { userModel } from '../../models/user.model.js'

class UserManagerMongo {
    constructor() {
        this.model = userModel
    }

    getUser = async filter => await this.model.findOne(filter)

    createUser = async newUser => await this.model.create(newUser)

    updateUser = async (userId, updateData) => {
        return await this.model.updateOne({ _id: userId }, { $set: updateData });
    }
}

export {
    UserManagerMongo
}