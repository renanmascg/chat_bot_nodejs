import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import botStocksRouter from '@modules/stock_prices_bot/infra/http/routes/botStock.routes';

const routes = Router();

// Users routes
routes.use('/users', usersRouter);

// Sessions routes
routes.use('/sessions', sessionsRouter);

// Bot Stock Routes
routes.use('/stock-prices', botStocksRouter);

export default routes;
