import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared/container';

import App from './app';

App.io.listen(+(process.env.PORT_SOCKET || ''), {
  cors: {
    origin: '*',
  },
});

App.server.listen(process.env.PORT_API, () => {
  console.log(`🚀 Server Started on port ${process.env.PORT_API}`);
});
