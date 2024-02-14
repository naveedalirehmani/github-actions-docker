import { Router } from "express";
const localAuthentication = Router();

import {
  loginHandler,
  signupHandler,
  getSessionHandler,
  deleteSessionHandler,
} from "../../../controller/authentication/local";

import { requireUser } from "../../../middlewares/requireUser";

// login
localAuthentication.post("/login", loginHandler);

// login
localAuthentication.post("/signup", signupHandler);

// get the current session
localAuthentication.get("/session", requireUser, getSessionHandler);

// logout
localAuthentication.delete("/session", requireUser, deleteSessionHandler);

export default localAuthentication;
