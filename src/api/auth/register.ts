import { register } from "@/lib/auth";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema } from "@/schemas/user";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../../models/User";

const registerUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { token } = await register({ email, password });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(registerUser, {
  validation: { body: userSchema },
});
