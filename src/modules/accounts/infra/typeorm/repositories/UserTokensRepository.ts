import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';

import { UserTokens } from '../entities/UserTokens';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.ormRepository.findOne({ where: { user_id, refresh_token } });
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserTokens | undefined> {
    return this.ormRepository.findOne({ where: { refresh_token } });
  }
}
