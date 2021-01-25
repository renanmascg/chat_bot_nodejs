import { inject, injectable } from 'tsyringe';
import Message from '../infra/typeorm/entities/Message';
import MessagesRepository from '../infra/typeorm/repositories/MessagesRepository';

@injectable()
class GetMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: MessagesRepository,
  ) {}

  public async execute(): Promise<Message[]> {
    const messages = await this.messagesRepository.getLastMessages({
      messagesNumber: 50,
    });

    return messages;
  }
}

export default GetMessagesService;
