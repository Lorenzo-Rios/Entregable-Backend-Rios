import { userModel } from '../../models/user.model.js'

class UserDAO {
    constructor() {
        this.model = userModel
    }

    getAllUsers = async () => await this.model.find({})

    getUser = async filter => await this.model.findOne(filter)

    createUser = async newUser => await this.model.create(newUser)

    updateUser = async (userId, updateData) => {
        return await this.model.updateOne({ _id: userId }, { $set: updateData });
    }

    deleteUser = async  (userId) => await this.model.findByIdAndDelete(userId)
}

export {
    UserDAO
}