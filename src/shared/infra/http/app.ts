import 'reflect-metadata';

import express from 'express';

import createConnection from '@shared/infra/typeorm';

import routes from './routes';

createConnection();
const app = express();

app.use('/api/v1', routes);

export default app;
