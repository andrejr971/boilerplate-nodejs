import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able authenticate user', async () => {
    const user = await createUserUseCase.execute({
      email: 'beac@wu.ao',
      name: 'Jay Flores',
      password: '1234567',
    });

    const authenticate = await authenticateUserUseCase.execute({
      email: user.email,
      password: '1234567',
    });

    expect(authenticate).toHaveProperty('token');
  });

  it('should not be able authenticate user with email icorrect', async () => {
    await createUserUseCase.execute({
      email: 'beac@w.ao',
      name: 'Jay Flores',
      password: '1234567',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'test@test.com',
        password: '1234567',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!', 401));
  });

  it('should not be able authenticate user with password incorrect', async () => {
    await createUserUseCase.execute({
      email: 'tuwuwsov@sij.to',
      name: 'Jay Flores',
      password: '1234567',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'tuwuwsov@sij.to',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!', 401));
  });
});
