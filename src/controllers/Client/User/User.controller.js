import { UserDto } from '../../../dto/users.dto.js';
import { userService } from '../services/user.service.js';

async function GetUser(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.sendSuccess(users);
    } catch (error) {
        console.error('Error en GetUser:', error);
        res.sendServerError('Error fetching Users');
    }
}

async function PostUser(req, res) {
    try {
        const userData = req.body;
        const userDto = new UserDto(userData)
        const newUser = await userService.createUser(userDto);
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
        const updatedUser = await userService.updateUser(uid, userData);
        res.sendSuccess(updatedUser);
    } catch (error) {
        console.error('Error en PutUser:', error);
        res.sendServerError('Error updating User');
    }
}

async function DeleteUser(req, res) {
    try {
        const { uid } = req.params;
        const deletedUser = await userService.deleteUser(uid);
        res.sendSuccess(deletedUser);
    } catch (error) {
        console.error('Error en DeleteUser:', error);
        res.sendServerError('Error deleting User');
    }
}

export { GetUser, PostUser, PutUser, DeleteUser };