import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import App from './app';

App.server.listen(process.env.PORT, () => {
  console.log(`🚀 Server Started on port ${process.env.PORT}`);
});
