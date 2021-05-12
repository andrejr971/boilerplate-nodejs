import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let refreshTokenUseCase: RefreshTokenUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Refresh Token', () => {
  beforeEach(() => {
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

    refreshTokenUseCase = new RefreshTokenUseCase(
      userTokensRepositoryInMemory,
      dateProvider,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able create refresh token', async () => {
    const user = await createUserUseCase.execute({
      email: 'zafi@tip.mo',
      name: 'Jay Flores',
      password: '1234567',
    });

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: '1234567',
    });

    const refresh_token = await refreshTokenUseCase.execute(
      authentication.refresh_token,
    );

    expect(refresh_token).toHaveProperty('refresh_token');
  });
});
