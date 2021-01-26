import { inject, injectable } from 'tsyringe';
import IStockDTO from '../dtos/IStockDTO';
import IStockRepository from '../repositories/IStockRepository';

@injectable()
class GetStockFromApi {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
  ) {}

  public async execute({ stockName }: IStockDTO): Promise<string> {
    try {
      const stockData = await this.stockRepository.findByStockName({
        stockName,
      });

      const stockValueText = `${
        stockData.Symbol
      } quote is $${stockData.Close.toFixed(2)} per share.`;

      return stockValueText;
    } catch (err) {
      return `Stock Api Could Not Find Stock: ${stockName} `;
    }
  }
}

export default GetStockFromApi;
