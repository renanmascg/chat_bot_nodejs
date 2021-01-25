import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import Message from '../infra/typeorm/entities/Message';

interface IMessagesRepository {
  // getLastMessages(date: Date): Promise<Message | undefined>;3qq
  create(data: ICreateMessageDTO): Promise<Message>;
}

export default IMessagesRepository;
