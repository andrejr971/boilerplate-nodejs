import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id);
  }

  async allUsers(): Promise<User[]> {
    return this.users;
  }

  async update(user: User): Promise<User> {
    const findUser = this.users.findIndex(find => find.id === user.id);

    this.users[findUser] = user;

    return user;
  }
}
