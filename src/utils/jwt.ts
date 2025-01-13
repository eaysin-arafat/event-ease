import { env } from "@/env";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: env?.JWT_EXPIRATION,
  });
};
