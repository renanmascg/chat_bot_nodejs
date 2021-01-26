import GetStockFromApi from '@modules/stock_prices_bot/services/getStockPriceFromApi';
import { container } from 'tsyringe';

class StockPriceBot {
  public async show(stockName: string): Promise<string> {
    const getStockFromApi = container.resolve(GetStockFromApi);

    const stockDataText = await getStockFromApi.execute({
      stockName,
    });

    return stockDataText;
  }
}

export default StockPriceBot;
