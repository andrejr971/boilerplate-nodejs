import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ password, token }: IRequest): Promise<boolean> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token Invalid');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = await hash(password, 8);

    await this.userRepository.update(user);

    await this.userTokensRepository.deleteById(userToken.id);

    return true;
  }
}
