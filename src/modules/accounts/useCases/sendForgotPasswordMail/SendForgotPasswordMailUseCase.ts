import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.APP_WEB_URL}/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}
