import ICreateMessageDTO from '@modules/messages/dtos/ICreateMessageDTO';
import IGetLastMessagesDTO from '@modules/messages/dtos/IGetLastMessagesDTO';
import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import { getRepository, Repository } from 'typeorm';
import Message from '../entities/Message';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  async getLastMessages({
    messagesNumber,
  }: IGetLastMessagesDTO): Promise<Message[]> {
    const messages = await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
      take: messagesNumber,
    });

    return messages;
  }

  async create({ message, user_id }: ICreateMessageDTO): Promise<Message> {
    const messageEntity = this.ormRepository.create({
      message,
      user_id,
    });

    await this.ormRepository.save(messageEntity);

    return messageEntity;
  }
}

export default MessagesRepository;
