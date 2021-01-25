import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
