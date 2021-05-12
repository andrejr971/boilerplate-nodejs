import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUserTokensRepository } from '../IUserTokensRepository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

    Object.assign(userTokens, data);

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      token =>
        token.refresh_token === refresh_token && token.user_id === user_id,
    );
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens.filter(token => token.id !== id);
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      token => token.refresh_token === refresh_token,
    );
  }
}
