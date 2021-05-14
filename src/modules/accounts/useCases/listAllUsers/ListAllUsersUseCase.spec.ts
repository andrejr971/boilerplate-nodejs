import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import { ListAllUsersUseCase } from './ListAllUsersUseCase';

let listAllUsersUseCase: ListAllUsersUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('List all Users', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    listAllUsersUseCase = new ListAllUsersUseCase(userRepositoryInMemory);
  });

  it('should be able to list all users', async () => {
    const users = listAllUsersUseCase.execute();

    expect((await users).length).toEqual(0);
  });
});
