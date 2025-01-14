import { env } from "@/env";
import AuthenticationError from "@/errors/authentication-error";
import InternalServerError from "@/errors/internal-server-error";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = env.JWT_SECRET || "access-secret";
const JWT_EXPIRATION = env.JWT_EXPIRATION || "15m";

interface GenerateTokenOptions {
  payload: string;
  algorithm?: jwt.Algorithm;
  secret?: string;
  expiresIn?: string;
}

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = JWT_SECRET,
  expiresIn = JWT_EXPIRATION,
}: GenerateTokenOptions): string => {
  const tokenPayload = typeof payload === "string" ? { id: payload } : payload;

  try {
    return jwt.sign(tokenPayload, secret, {
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
  token: string;
  algorithm?: jwt.Algorithm;
  secret?: string;
}

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = JWT_SECRET,
}: VerifyTokenOptions) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (error) {
    console.log("[JWT]", error);
    throw new AuthenticationError();
  }
};

export { decodeToken, generateToken, verifyToken };
