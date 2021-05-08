import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
