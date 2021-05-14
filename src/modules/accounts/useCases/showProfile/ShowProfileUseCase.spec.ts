import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowProfileUseCase } from './ShowProfileUseCase';

let showProfileUseCase: ShowProfileUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Show Profile', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    showProfileUseCase = new ShowProfileUseCase(userRepositoryInMemory);
  });

  it('should be able show me profile', async () => {
    const user = await createUserUseCase.execute({
      email: 'leovu@mihudu.az',
      name: 'Jay Flores',
      password: '1234567',
    });

    const showProfile = await showProfileUseCase.execute(user.id);

    expect(showProfile).toHaveProperty('id');
  });

  it('should not be able show me profile', async () => {
    await expect(showProfileUseCase.execute('user_id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
