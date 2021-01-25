import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetStockFromApi from '@modules/stock_prices_bot/services/getStockPriceFromApi';

class StocksController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { stockName } = request.body;

    const getStockFromApi = container.resolve(GetStockFromApi);

    const stockDataText = await getStockFromApi.execute({
      stockName,
    });

    return response.json({ stockDataText });
  }
}

export default StocksController;
