import DuplicateKeyError from "@/errors/duplicate-key-error";
import User from "@/models/User";
import { hashPassword } from "@/utils/hash";
import { userExists } from "./utils";

const create = async (email: string, password: string) => {
  const existingUser = await userExists(email);
  if (existingUser) throw new DuplicateKeyError("User", "email");

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser?.toObject();
};

export { create };
