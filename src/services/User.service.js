import { UserManagerMongo } from "../mongo/User/userManager.mongo.js";

const userManager = new UserManagerMongo();

class UserService {
    async getAllUsers() {
        return await userManager.getAllUsers();
    }

    async createUser(userData) {
        return await userManager.createUser(userData);
    }

    async updateUser(uid, userData) {
        return await userManager.updateUser(uid, userData);
    }

    async deleteUser(uid) {
        return await userManager.deleteUser(uid);
    }

    async getUser(filter) {
        return await userManager.getUser(filter);
    }
}

export const userService = new UserService();