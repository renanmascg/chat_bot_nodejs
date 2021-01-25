import { inject, injectable } from 'tsyringe';
import Message from '../infra/typeorm/entities/Message';
import MessagesRepository from '../infra/typeorm/repositories/MessagesRepository';

interface IRequestDTO {
  user_id: string;
  message: string;
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: MessagesRepository,
  ) {}

  public async execute({ user_id, message }: IRequestDTO): Promise<Message> {
    const messageEntity = await this.messagesRepository.create({
      message,
      user_id,
    });

    return messageEntity;
  }
}

export default CreateMessageService;
