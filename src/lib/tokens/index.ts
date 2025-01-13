import { env } from "@/env";
import AuthenticationError from "@/errors/authentication-error";
import InternalServerError from "@/errors/internal-server-error";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AccessTokenPayload, RefreshTokenPayload } from "./types";

dotenv.config();

const JWT_SECRET = env.JWT_SECRET || "access-secret";
const JWT_EXPIRATION = env.JWT_EXPIRATION || "15m";

interface GenerateTokenOptions {
  type: "AccessToken" | "RefreshToken";
  payload: AccessTokenPayload | RefreshTokenPayload;
  algorithm?: jwt.Algorithm;
  secret?: string;
  expiresIn?: string | number;
}

const generateToken = ({
  type = "AccessToken",
  payload,
  algorithm = "HS256",
  secret = JWT_SECRET,
  expiresIn = JWT_EXPIRATION,
}: GenerateTokenOptions): string => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (error) {
    console.log("[JWT]", error);
    throw new InternalServerError();
  }
};

// Define the options for decoding
interface DecodeTokenOptions {
  token: string;
}

const decodeToken = ({ token }: DecodeTokenOptions): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload | null;
  } catch (error) {
    console.log("[JWT]", error);
    throw new AuthenticationError();
  }
};

// Define the options for verifying the token
interface VerifyTokenOptions {
  type: "AccessToken" | "RefreshToken";
  token: string;
  algorithm?: jwt.Algorithm;
  secret?: string;
}

const verifyToken = ({
  type,
  token,
  algorithm = "HS256",
  secret = JWT_SECRET,
}: VerifyTokenOptions): AccessTokenPayload | RefreshTokenPayload => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] }) as
      | AccessTokenPayload
      | RefreshTokenPayload;
  } catch (error) {
    console.log("[JWT]", error);
    throw new AuthenticationError();
  }
};

export { decodeToken, generateToken, verifyToken };
