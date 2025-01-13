import DuplicateKeyError from "@/errors/duplicate-key-error";
import { requestMiddleware } from "@/middleware/request-middleware";
import { userSchema } from "@/schemas/user";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const registerUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) throw new DuplicateKeyError("User", "email");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(registerUser, {
  validation: { body: userSchema },
});
