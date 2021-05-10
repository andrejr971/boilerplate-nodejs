import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const exitsEmail = await this.userRepository.findByEmail(data.email);

    if (exitsEmail) {
      throw new AppError('User already exits');
    }

    const password = await hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password,
    });

    return user;
  }
}
