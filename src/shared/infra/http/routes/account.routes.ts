import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { ShowProfileController } from '@modules/accounts/useCases/showProfile/ShowProfileController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const accountRoutes = Router();
const uploadFile = multer(upload);
const showProfileController = new ShowProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();

accountRoutes.use(ensureAuthenticated);
accountRoutes.get('/', showProfileController.handle);
accountRoutes.patch(
  '/avatar',
  uploadFile.single('avatar'),
  updateUserAvatarController.handle,
);

export { accountRoutes };
