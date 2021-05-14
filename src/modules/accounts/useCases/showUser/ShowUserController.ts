import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserUseCase } from './ShowUserUseCase';

export class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserUseCase = container.resolve(ShowUserUseCase);

    const user = await showUserUseCase.execute(id);

    return response.json(classToClass(user));
  }
}
