import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import App from './app';

App.server.listen(3333, () => {
  console.log('🚀 Server Started on port 3333');
});
