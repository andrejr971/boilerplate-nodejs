import request from 'supertest';
import { Connection } from 'typeorm';

import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('RefreshTokenController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create refresh token', async () => {
    const responseUser = await request(app).post('/api/v1/users').send({
      name: 'Bessie Barton',
      email: 'lu@sovpal.bz',
      password: 'teste123',
    });

    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: responseUser.body.email,
      password: 'teste123',
    });

    const responseRefreshToken = await request(app)
      .post('/api/v1/refresh-token')
      .send({
        token: responseToken.body.refresh_token,
      });

    expect(responseRefreshToken.status).toBe(200);
    expect(responseRefreshToken.body).toHaveProperty('refresh_token');
  });
});
