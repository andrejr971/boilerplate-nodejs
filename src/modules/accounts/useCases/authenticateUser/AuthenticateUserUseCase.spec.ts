import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
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
