import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
}
