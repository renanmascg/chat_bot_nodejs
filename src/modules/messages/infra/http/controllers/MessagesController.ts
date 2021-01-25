import CreateMessageService from '@modules/messages/services/CreateMessageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
}

export default MessagesController;
