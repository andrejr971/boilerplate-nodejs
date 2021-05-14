import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ShowUserController } from '@modules/accounts/useCases/showUser/ShowUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();

userRoutes.post('/', createUserController.handle);

userRoutes.use(ensureAuthenticated);
userRoutes.get('/:id', showUserController.handle);

export { userRoutes };
