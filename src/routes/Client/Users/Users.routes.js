import { RouterClass } from '../utils/RouterClass.js';
import { GetUser, PostUser, PutUser, DeleteUser } from '../controllers/user.controller.js';

class UserRoute extends RouterClass {
    init() {
        this.get('/', ['user'], GetUser);
        this.post('/', ['admin'], PostUser);
        this.put('/:uid', ['admin'], PutUser);
        this.delete('/:uid', ['admin'], DeleteUser);
    }
}

export { UserRoute };