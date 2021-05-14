import { container } from 'tsyringe';

import './providers';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';

import { LocalStorageProvider } from './providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './providers/StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
);
