import IStockDTO from '../dtos/IStockDTO';
import Stock from '../infra/remote_datasource/entities/Stock';

interface IStockRepository {
  findByStockName(data: IStockDTO): Promise<Stock>;
}

export default IStockRepository;
