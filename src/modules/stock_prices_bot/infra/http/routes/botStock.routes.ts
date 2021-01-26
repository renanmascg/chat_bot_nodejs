import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import StocksController from '../controllers/StocksController';

const botStocksRouter = Router();
const stocksController = new StocksController();

botStocksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      stockName: Joi.string().required(),
    },
  }),
  stocksController.show,
);

export default botStocksRouter;
