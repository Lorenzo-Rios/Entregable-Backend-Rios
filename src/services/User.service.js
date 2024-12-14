import { userRepository } from '../repositories/user.repository.js';

class UserService {
    async getAllUsers() {
        return await userRepository.getAll();
    }

    async createUser(userData) {
        return await userRepository.create(userData);
    }

    async updateUser(uid, userData) {
        return await userRepository.update(uid, userData);
    }

    async deleteUser(uid) {
        return await userRepository.delete(uid);
    }
}

export default UserService; // Exportas la clase, no la instancia