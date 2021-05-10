// import request from 'supertest';
// import { Connection } from 'typeorm';

// import app from '@shared/infra/http/app';
// import createConnection from '@shared/infra/typeorm';

// let connection: Connection;

// describe('CreateUserController', () => {
//   beforeAll(async () => {
//     connection = await createConnection();
//     await connection.runMigrations();
//   });

//   afterAll(async () => {
//     await connection.dropDatabase();
//     await connection.close();
//   });

//   it('should be able to create a new category', async () => {
//     const responseToken = await request(app).post('/session').send({
//       email: 'admin@rentx.com.br',
//       password: 'admin',
//     });

//     const { refresh_token } = responseToken.body;

//     const response = await request(app)
//       .post('/categories')
//       .send({
//         name: 'Category supertest',
//         description: 'Category Supertest',
//       })
//       .set({
//         Authorization: `Bearer ${refresh_token}`,
//       });

//     expect(response.status).toBe(201);
//   });
// });
