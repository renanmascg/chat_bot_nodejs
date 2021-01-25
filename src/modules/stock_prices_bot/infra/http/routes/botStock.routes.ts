import { Router } from 'express';

import StocksController from '../controllers/StocksController';

const botStocksRouter = Router();
const stocksController = new StocksController();

botStocksRouter.post('/', stocksController.show);

export default botStocksRouter;
