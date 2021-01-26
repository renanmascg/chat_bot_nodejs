import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.use(ensureAuthenticated);

messagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      message: Joi.string().required(),
    },
  }),
  messagesController.create,
);

messagesRouter.get('/', messagesController.index);

export default messagesRouter;
