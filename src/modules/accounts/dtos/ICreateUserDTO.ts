export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  deleted_at?: Date;
}
