import { container } from 'tsyringe';

import './providers';

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
