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

  it('should be able show user', async () => {
    const user = await request(app).post('/api/v1/users').send({
      name: 'Bessie Barton',
      email: 'miccu@mosisbiw.ki',
      password: 'teste123',
    });

    const { id, email } = user.body;

    const responseToken = await request(app).post('/api/v1/sessions').send({
      email,
      password: 'teste123',
    });

    const { refresh_token } = responseToken.body;

    const responseUser = await request(app)
      .get(`/api/v1/users/${id}`)
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(responseUser.status).toBe(200);
    expect(responseUser.body).toHaveProperty('id');
  });
});
