import request from 'supertest';
import { Connection } from 'typeorm';

import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('AuthenticateUserController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const responseUser = await request(app).post('/api/v1/users').send({
      name: 'Bessie Barton',
      email: 'miccu@mosisbiw.ki',
      password: 'teste123',
    });

    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: responseUser.body.email,
      password: 'teste123',
    });

    expect(responseToken.status).toBe(200);
    expect(responseToken.body).toHaveProperty('token');
  });
});
