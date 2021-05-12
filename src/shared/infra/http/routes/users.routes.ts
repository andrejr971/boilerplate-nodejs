import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

userRoutes.use(ensureAuthenticated);
userRoutes.get('/', (request, response) => response.json(request.user.id));

export { userRoutes };
