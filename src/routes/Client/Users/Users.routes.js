import { RouterClass } from '../RouterClass/RouterClass.routes.js';
import { GetUser, PostUser, PutUser, DeleteUser } from '../../../controllers/Client/User/User.controller.js';

class UserRoute extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], GetUser);
        this.post('/', ['admin'], PostUser);
        this.put('/:uid', ['admin'], PutUser);
        this.delete('/:uid', ['admin'], DeleteUser);
    }
}

export { UserRoute };