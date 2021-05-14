import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
// import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '@shared/errors/AppError';
// import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
// import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const autheHeader = request.headers.authorization;
  // const userTokensRepository = new UserTokensRepository();

  if (!autheHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = autheHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret) as IPayload;

    // const user = await userTokensRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token,
    // );

    // if (!user) {
    //   throw new AppError('User does not exists', 404);
    // }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalidate token', 401);
  }
}
