import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

// Users routes
routes.use('/users', usersRouter);

// Sessions routes
routes.use('/sessions', sessionsRouter);

export default routes;
