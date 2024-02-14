import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

const secretKey: any = process.env.SECRET_KEY;

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
