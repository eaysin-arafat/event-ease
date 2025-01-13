import { userService } from "..";
import { generateToken } from "../tokens";
import { UserSchema } from "./../../schemas/user";

const register = async (data: UserSchema) => {
  const { email, password } = data;
  const newUser = await userService?.create(email, password);

  const token = generateToken(newUser.id);

  return { token };
};

export default register;
