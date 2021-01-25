import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import IGetLastMessagesDTO from '../dtos/IGetLastMessagesDTO';
import Message from '../infra/typeorm/entities/Message';

interface IMessagesRepository {
  getLastMessages(data: IGetLastMessagesDTO): Promise<Message[]>;
  create(data: ICreateMessageDTO): Promise<Message>;
}

export default IMessagesRepository;
