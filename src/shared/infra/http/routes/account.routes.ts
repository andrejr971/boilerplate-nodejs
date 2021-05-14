import { Router } from 'express';

import { ShowProfileController } from '@modules/accounts/useCases/showProfile/ShowProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accountRoutes = Router();
const showProfileController = new ShowProfileController();

accountRoutes.use(ensureAuthenticated);
accountRoutes.get('/', showProfileController.handle);

export { accountRoutes };
