import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMessageService from '@modules/messages/services/CreateMessageService';
import GetMessagesService from '@modules/messages/services/GetMessagesService';

class MessagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;

    const { id } = request.user;

    const createMessageService = container.resolve(CreateMessageService);

    const messageEntity = await createMessageService.execute({
      message,
      user_id: id,
    });

    return response.json({ message: messageEntity });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getMessagesService = container.resolve(GetMessagesService);

    const messages = await getMessagesService.execute();

    return response.json({ messages });
  }
}

export default MessagesController;
