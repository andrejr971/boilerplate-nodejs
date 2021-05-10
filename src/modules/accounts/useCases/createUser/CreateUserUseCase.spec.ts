import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able create a new user', async () => {
    const data = {
      name: 'Bessie Barton',
      email: 'kecit@mahuduv.tn',
      password: 'teste123',
    };

    const user = await createUserUseCase.execute(data);

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a new user with already email exist', async () => {
    await userRepositoryInMemory.create({
      name: 'Bessie Barton',
      email: 'gumul@asvuc.se',
      password: 'teste123',
    });

    const data = {
      name: 'Bessie Barton',
      email: 'gumul@asvuc.se',
      password: 'teste123',
    };

    await expect(createUserUseCase.execute(data)).rejects.toEqual(
      new AppError('User already exits'),
    );
  });
});
