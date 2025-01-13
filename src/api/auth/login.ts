import { login } from "@/lib/auth";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema } from "@/schemas/user";
import { NextFunction, Request, Response } from "express";

const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await login({ email, password });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(loginUser, {
  validation: { body: userSchema },
});
