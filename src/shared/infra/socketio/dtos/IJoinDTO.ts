import { Socket } from 'socket.io';

export interface IJoinDTO {
  client: Socket;
  name: string;
  token: string;
}

export interface IJoinRequest {
  name: string;
  token: string;
}
