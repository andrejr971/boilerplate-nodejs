import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(user_id);
  }

  async allUsers(): Promise<User[]> {
    return this.ormRepository.find();
  }

  async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
