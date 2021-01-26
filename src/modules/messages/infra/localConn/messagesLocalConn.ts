import CreateMessageService from '@modules/messages/services/CreateMessageService';
import GetMessagesService from '@modules/messages/services/GetMessagesService';
import { container } from 'tsyringe';
import Message from '../typeorm/entities/Message';

class MessagesLocalConn {
  public async create(message: string, id: string): Promise<Message> {
    try {
      const createMessageService = container.resolve(CreateMessageService);

      const messageEntity = await createMessageService.execute({
        message,
        user_id: id,
      });

      return messageEntity;
    } catch (err) {
      return {
        message: 'SERVER ERROR - TRY AGAIN LATER',
        user_id: 'SERVER',
      } as Message;
    }
  }

  public async index(): Promise<Message[]> {
    try {
      const getMessagesService = container.resolve(GetMessagesService);

      const messages = await getMessagesService.execute();

      return messages;
    } catch (error) {
      return [];
    }
  }
}

export default MessagesLocalConn;
