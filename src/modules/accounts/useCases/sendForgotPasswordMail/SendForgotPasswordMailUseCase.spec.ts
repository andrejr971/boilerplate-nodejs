import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-Memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersRepositoryInMemoty: UserRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemoty = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemoty,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a mail to user', async () => {
    const sendMAil = spyOn(mailProviderInMemory, 'sendMail');

    const user = await usersRepositoryInMemoty.create({
      email: 'rem@buzdu.ma',
      password: '123456',
      name: 'Jaumeb',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMAil).toBeCalled();
  });

  it('should not be able to send a mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('gulapjaw@beneti.cg'),
    ).rejects.toEqual(new AppError('User does not exists', 404));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    const user = await usersRepositoryInMemoty.create({
      email: 'rem@buzghjghdu.ma',
      password: '123456',
      name: 'Jaumeb',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toBeCalled();
  });
});
