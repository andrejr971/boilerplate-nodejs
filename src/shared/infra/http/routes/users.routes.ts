import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListAllUsersController } from '@modules/accounts/useCases/listAllUsers/ListAllUsersController';
import { ShowUserController } from '@modules/accounts/useCases/showUser/ShowUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const listAllUsersController = new ListAllUsersController();

userRoutes.post('/', createUserController.handle);

userRoutes.use(ensureAuthenticated);
userRoutes.get('/', listAllUsersController.handle);
userRoutes.get('/:id', showUserController.handle);

export { userRoutes };
