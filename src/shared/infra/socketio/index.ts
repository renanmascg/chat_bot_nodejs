import MessagesLocalConn from '@modules/messages/infra/localConn/messagesLocalConn';
import StockPriceBot from '@modules/stock_prices_bot/infra/localConn/stock_price_bot';
import socketIo, { Socket } from 'socket.io';

class SocketIOFunctions {
  private io: socketIo.Server;

  constructor(io: socketIo.Server) {
    this.io = io;
  }

  public async onJoin(name: string, client: Socket): Promise<void> {
    const localMessages = new MessagesLocalConn();
    const messages = await localMessages.index();

    client.emit('update', 'You have connected to the server.');
    client.emit('initial_messages', messages);
    client.broadcast.emit('update', `${name} has joined the server.`);
  }

  public async onSend(
    client: Socket,
    message: string,
    user_id: string,
  ): Promise<void> {
    const localMessages = new MessagesLocalConn();
    const messageEntity = await localMessages.create(message, user_id);

    client.broadcast.emit('chat', messageEntity);
  }

  public async onStockCall(client: Socket, stockName: string): Promise<void> {
    const stockPriceBot = new StockPriceBot();
    const stockPriceMessage = await stockPriceBot.show(stockName);

    client.broadcast.emit('stock_bot', stockPriceMessage);
  }

  public onDisconnect(): void {
    this.io.emit('update', `Client has left the server.`);
  }
}

export default SocketIOFunctions;
