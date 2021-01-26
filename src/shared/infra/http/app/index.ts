import auth from '@config/auth';
import globalErrorHandling from '@shared/errors/GlobalErrorHandling';
import SocketIOFunctions from '@shared/infra/socketio';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer, Server } from 'http';
import socketIo from 'socket.io';
import routes from '../routes';

class App {
  private app: express.Application;

  public server: Server;

  private io: socketIo.Server;

  private socketIOFunctions: SocketIOFunctions;

  constructor() {
    this.initializeExpress();
    this.initializeSockets();
    this.listen();
  }

  private initializeExpress(): void {
    this.app = express();

    this.app.use(cors());

    this.app.use(express.json());
    this.app.use('/files', express.static(auth.directory));
    this.app.use(routes);

    this.app.use(globalErrorHandling);
  }

  private initializeSockets(): void {
    this.server = createServer(this.app);
    this.io = new socketIo.Server(this.server);
    this.socketIOFunctions = new SocketIOFunctions(this.io);
  }

  private listen(): void {
    this.io.on('connection', (client: any) => {
      client.on('join', async (name: string) =>
        this.socketIOFunctions.onJoin(name, client),
      );

      client.on(
        'send',
        async (msg: string, user_id: string, userName: string) =>
          this.socketIOFunctions.onSend(client, msg, user_id, userName),
      );

      client.on('stock_api', async (userName: string, stockName: string) =>
        this.socketIOFunctions.onStockCall(client, userName, stockName),
      );

      client.on('disconnect', () => {
        this.io.emit('update', `Client has left the server.`);
      });
    });
  }
}

export default new App();
