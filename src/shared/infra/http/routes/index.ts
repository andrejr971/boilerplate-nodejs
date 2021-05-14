import { Router } from 'express';

import { accountRoutes } from './account.routes';
import { sessionRoutes } from './sessions.routes';
import { userRoutes } from './users.routes';

const routes = Router();

routes.use('/', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/account', accountRoutes);

export default routes;
