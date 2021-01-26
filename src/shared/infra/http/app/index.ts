import auth from '@config/auth';
import globalErrorHandling from '@shared/errors/GlobalErrorHandling';
import SocketIOFunctions from '@shared/infra/socketio';

import { IJoinRequest } from '@shared/infra/socketio/dtos/IJoinDTO';
import { ISendRequest } from '@shared/infra/socketio/dtos/ISendDTO';
import { createServer, Server } from 'http';

import cors from 'cors';

import express from 'express';
import 'express-async-errors';
import socketIo from 'socket.io';

import routes from '../routes';

class App {
  private app: express.Application;

  public server: Server;

  public io: socketIo.Server;

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
    this.socketIOFunctions = new SocketIOFunctions();
  }

  public listen(): void {
    this.io.on('connection', (client: any) => {
      client.on('join', async ({ name, token }: IJoinRequest) =>
        this.socketIOFunctions.onJoin({
          name,
          token,
          client,
        }),
      );

      client.on('send', async ({ name, text, token }: ISendRequest) =>
        this.socketIOFunctions.onSend({
          client,
          name,
          text,
          token,
        }),
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
