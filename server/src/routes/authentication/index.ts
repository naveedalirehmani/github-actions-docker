import { Router } from "express";
const authenticationRouter = Router();

import localAuthentication from "./local";
import googleAuthentication from './google'

authenticationRouter.use("/local", localAuthentication);
// authenticationRouter.use('/local',googleAuthentication)

export default authenticationRouter;
