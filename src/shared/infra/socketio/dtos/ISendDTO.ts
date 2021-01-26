import { Socket } from 'socket.io';

export interface ISendDTO {
  client: Socket;
  text: string;
  name: string;
  token: string;
}

export interface ISendRequest {
  text: string;
  name: string;
  token: string;
}
