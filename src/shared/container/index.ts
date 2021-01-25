import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IStockRepository from '@modules/stock_prices_bot/repositories/IStockRepository';
import StockRepository from '@modules/stock_prices_bot/infra/remote_datasource/repositories/stockRepository';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';
import CustomApiRequest from '../infra/api/customApiRequest';

// Auxiliar Injection
container.registerSingleton<CustomApiRequest>(
  'CustomApiRequest',
  CustomApiRequest,
);

// Users Injection
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// Stocks Injection
container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository,
);

// Messages Injection
container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);
