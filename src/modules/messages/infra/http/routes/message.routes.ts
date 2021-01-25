import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.use(ensureAuthenticated);

messagesRouter.post('/', messagesController.create);

export default messagesRouter;
