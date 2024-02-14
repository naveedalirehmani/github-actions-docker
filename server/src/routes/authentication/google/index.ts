import { Router } from 'express';
const googleAuthentication = Router();

import googleoAuthController from '../../../controller/authentication/google';

googleAuthentication.get('/oauth/google', googleoAuthController.oAuthHandler);
googleAuthentication.get('/oauth/google/login', googleoAuthController.loginHandler);

export = googleAuthentication;
