import { Socket } from 'socket.io';

export interface IStockApiDTO {
  client: Socket;
  stockName: string;
  name: string;
  token: string;
}

export interface IStockApiRequest {
  stockName: string;
  name: string;
  token: string;
}
