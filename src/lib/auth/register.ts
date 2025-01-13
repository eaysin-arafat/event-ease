import { generateToken } from "../tokens";
import { createUser } from "../users";
import { UserSchema } from "./../../schemas/user";

const register = async (data: UserSchema) => {
  const { email, password } = data;
  const newUser = await createUser(email, password);

  const token = generateToken(newUser._id.toString());

  return { token };
};

export default register;
