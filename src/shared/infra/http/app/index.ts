import express from 'express';
import 'express-async-errors';

import { createServer, Server } from 'http';
import socketIo from 'socket.io';

import globalErrorHandling from '@shared/errors/GlobalErrorHandling';
import auth from '@config/auth';
import cors from 'cors';
import routes from '../routes';

class App {
  private app: express.Application;

  public server: Server;

  private io: socketIo.Server;

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
  }

  private listen(): void {
    this.io.on('connection', (client: any) => {
      client.on('join', (name: string) => {
        console.log(`Joined: ${name}`);
        client.emit('update', 'You have connected to the server.');
        client.broadcast.emit('update', `${name} has joined the server.`);
      });

      client.on('send', (msg: string) => {
        console.log(`Message: ${msg}`);
        client.broadcast.emit('chat', msg);
      });

      client.on('disconnect', () => {
        console.log('Disconnect');
        this.io.emit('update', `Client has left the server.`);
      });
    });
  }
}

export default new App();
