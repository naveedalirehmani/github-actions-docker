import { Request, Response } from "express";
import {
  getUser,
  invalidateSession,
  createSession,
  createUser,
} from "../../../model/authencation/local";
import { signJWT, verifyJWT } from "../../../utils/jwt.utils";
import {
  ResponseStatus,
  ResponseMessages,
} from "../../../helpers/responseEnums";

// login handler
export async function loginHandler(request: Request, response: Response) {
  const { email, password } = request.body;

  const user = await getUser(email);

  if (!user || user.password !== password) {
    return response
      .status(ResponseStatus.Unauthorized)
      .send(ResponseMessages.InvalidCredentials);
  }

  const session = await createSession(user.id);

  // create access token
  const accessToken = signJWT(
    {
      email: user.email,
      username: user.username,
      sessionId: session.sessionID,
    },
    "5m"
  );

  const refreshToken = signJWT({ sessionId: session.sessionID }, "1y");

  // set access token in cookie
  response.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  response.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back
  return response.status(ResponseStatus.Success).send(session);
}

export async function signupHandler(request: Request, response: Response) {
  const { email, password, username } = request.body;

  const existingUser = await getUser(email);

  if (existingUser) {
    return response
      .status(ResponseStatus.BadRequest)
      .send(ResponseMessages.UserAlreadyExists);
  }

  const newUser = await createUser(email, password, username);
  const newSession = await createSession(newUser.id);

  const accessToken = signJWT(
    {
      email: newUser.email,
      username: newUser.username,
      sessionId: newSession.sessionID,
    },
    "5m"
  );

  const refreshToken = signJWT({ sessionId: newSession.sessionID }, "1y");

  console.log(accessToken, "accesstoken");
  // Set access token in cookie
  response.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  console.log(refreshToken, "refreshToken");
  // Set refresh token in cookie
  response.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // Send user details and session back
  return response.status(ResponseStatus.Created).send(newSession);
}

// log out handler
export function getSessionHandler(request: Request, res: Response) {
  // @ts-ignore
  return response.send(request.user);
}

export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
}
