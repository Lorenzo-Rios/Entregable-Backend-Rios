import { userRepository } from '../../../repositories/User.repository.js'  

async function GetUser(req, res) {
    try {
        const users = await userRepository.getAll();
        res.sendSuccess(users);
    } catch (error) {
        console.error('Error en GetUser:', error);
        res.sendServerError('Error fetching Users');
    }
}

async function PostUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await userRepository.create(userData);
        res.sendSuccess(newUser);
    } catch (error) {
        console.error('Error en PostUser:', error);
        res.sendServerError('Error creating User');
    }
}

async function PutUser(req, res) {
    try {
        const { uid } = req.params;
        const userData = req.body;
        const updatedUser = await userRepository.update(uid, userData);
        res.sendSuccess(updatedUser);
    } catch (error) {
        console.error('Error en PutUser:', error);
        res.sendServerError('Error updating User');
    }
}

async function DeleteUser(req, res) {
    try {
        const { uid } = req.params;
        const deletedUser = await userRepository.delete(uid);
        res.sendSuccess(deletedUser);
    } catch (error) {
        console.error('Error en DeleteUser:', error);
        res.sendServerError('Error deleting User');
    }
}

export { GetUser, PostUser, PutUser, DeleteUser };