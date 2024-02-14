import { Router } from 'express';
const Api1 = Router();

import { requireUser } from '../middlewares/requireUser';

import helloRouter from './hello/hello.router';
import authentication from './authentication';
import protectedRouter from './protected/protected.router';

Api1.use('/hello', helloRouter);
Api1.use('/authentication', authentication);
Api1.use('/protected', requireUser, protectedRouter);

export = Api1;
