import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { FakeStorageProivider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let storageProvider: FakeStorageProivider;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Update Avatar User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    storageProvider = new FakeStorageProivider();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      userRepositoryInMemory,
      storageProvider,
    );
  });

  it('should be able update avatar', async () => {
    const user = await createUserUseCase.execute({
      email: 'leovu@mihudu.az',
      name: 'Jay Flores',
      password: '1234567',
      avatar: 'file',
    });

    const updateAvatar = await updateUserAvatarUseCase.execute({
      user_id: user.id,
      avatarFile: 'file',
    });

    expect(updateAvatar).toHaveProperty('id');
  });
});
