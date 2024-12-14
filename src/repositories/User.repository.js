import { userModel } from '../models/user.model.js';

class UserRepository {
    async getAll() {
        return await userModel.find();
    }

    async create(userData) {
        return await userModel.create(userData);
    }

    async update(uid, userData) {
        return await userModel.updateOne({ _id: uid }, userData);
    }

    async delete(uid) {
        return await userModel.deleteOne({ _id: uid });
    }
}

export const userRepository = new UserRepository();