import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowUserUseCase } from './ShowUserUseCase';

let showUserUseCase: ShowUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Show User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    showUserUseCase = new ShowUserUseCase(userRepositoryInMemory);
  });

  it('should be able show me profile', async () => {
    const user = await createUserUseCase.execute({
      email: 'leovu@mihudu.az',
      name: 'Jay Flores',
      password: '1234567',
    });

    const showUser = await showUserUseCase.execute(user.id);

    expect(showUser).toHaveProperty('id');
  });

  it('should not be able show me profile', async () => {
    await expect(showUserUseCase.execute('user_id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
