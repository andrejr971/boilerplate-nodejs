import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  refresh_token: string;
  token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    try {
      const { sub, email } = verify(
        token,
        auth.jwt.secret_refresh_token,
      ) as IPayload;

      const user_id = sub;

      const usersTokens = await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

      if (!usersTokens) {
        throw new AppError('Refresh Token does not exists');
      }

      await this.userTokensRepository.deleteById(usersTokens.id);

      const refresh_token_expires_date = this.dateProvider.addDays(
        auth.jwt.expires_refresh_token_days,
      );

      const refresh_token = sign({ email }, auth.jwt.secret_refresh_token, {
        subject: user_id,
        expiresIn: auth.jwt.expires_in_refresh_token,
      });

      await this.userTokensRepository.create({
        expires_date: refresh_token_expires_date,
        refresh_token,
        user_id,
      });

      const newToken = sign({}, auth.jwt.secret, {
        subject: user_id,
        expiresIn: auth.jwt.expires_in,
      });

      return { refresh_token, token: newToken };
    } catch {
      throw new AppError('Token invalid');
    }
  }
}
