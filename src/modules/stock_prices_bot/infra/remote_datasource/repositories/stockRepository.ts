import IStockDTO from '@modules/stock_prices_bot/dtos/IStockDTO';
import IStockRepository from '@modules/stock_prices_bot/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';
import CustomApiRequest from '@shared/infra/api/customApiRequest';
import csvtojson from 'csvtojson';
import { inject, injectable } from 'tsyringe';
import Stock from '../entities/Stock';

@injectable()
class StockRepository implements IStockRepository {
  constructor(
    @inject('CustomApiRequest')
    private customApiReq: CustomApiRequest,
  ) {}

  public async findByStockName({ stockName }: IStockDTO): Promise<Stock> {
    try {
      const responseCSV = await this.customApiReq.axiosInstance.get('', {
        params: {
          s: stockName,
        },
        responseType: 'blob',
      });

      const stockList: Stock[] = await csvtojson({
        colParser: {
          Close: 'number',
          High: 'number',
          Low: 'number',
          Open: 'number',
          Volume: 'number',
        },
      }).fromString(responseCSV.data);

      return stockList[0];
    } catch (err) {
      throw new AppError('Error getting files from endpoint.');
    }
  }
}

export default StockRepository;
