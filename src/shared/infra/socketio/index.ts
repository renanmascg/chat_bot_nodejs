import axios, { AxiosInstance } from 'axios';
import { IJoinDTO } from './dtos/IJoinDTO';
import { ISendDTO } from './dtos/ISendDTO';
import { IStockApiDTO } from './dtos/IStockApiDTO';

class SocketIOFunctions {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: `http://localhost:${process.env.PORT_API}`,
    });
  }

  public async onJoin({ token, name, client }: IJoinDTO): Promise<void> {
    try {
      const messages = await this.axios.get('/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      client.emit('update', 'You have connected to the server.');
      client.emit('initial_messages', messages.data.messages);
      client.broadcast.emit('update', `${name} has joined the server.`);
    } catch (err) {
      client.emit('update', 'You have connected to the server.');
      client.emit('initial_messages', []);
      client.broadcast.emit('update', `${name} has joined the server.`);
    }
  }

  public async onSend({ client, text, name, token }: ISendDTO): Promise<void> {
    try {
      const messageResponse = await this.axios.post(
        '/messages',
        {
          message: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { message } = messageResponse.data;

      client.broadcast.emit('chat', name, message.message);
    } catch (err) {
      client.emit('update', 'MESSAGE COULD NOT BE SENT. TRY AGAIN LATER');
    }
  }

  public async onStockCall({
    client,
    stockName,
    name,
    token,
  }: IStockApiDTO): Promise<void> {
    client.broadcast.emit('chat', name, `/stock=${stockName}`);

    try {
      const stockPriceMessage = await this.axios.post(
        '/stock-prices',
        {
          stockName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { stockDataText } = stockPriceMessage.data;

      client.emit('stock_bot', stockDataText);
      client.broadcast.emit('stock_bot', stockDataText);
    } catch (err) {
      client.emit('stock_bot', 'Maintenance Server - try again later ');
      client.broadcast.emit(
        'stock_bot',
        'Maintenance Server - try again later ',
      );
    }
  }
}

export default SocketIOFunctions;
