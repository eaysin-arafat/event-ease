import BadRequest from "@/errors/bad-request-error";
import { UserSchema } from "@/schemas/user";
import { comparePassword } from "@/utils/hash";
import { tokenService } from "..";
import { findUserByEmail } from "../users/utils";

/**
 * Authenticates a user by verifying the provided email and password.
 * If the credentials are valid, a JWT token is generated and returned.
 *
 * @param data - An object containing the user's email and password.
 * @returns A promise that resolves to a JWT token as a string.
 * @throws BadRequest - If the user is not found or credentials are invalid.
 */
const login = async (data: UserSchema): Promise<string> => {
  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) throw new BadRequest({ message: "User not found" });

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new BadRequest({ message: "Invalid credentials" });

  return tokenService?.generateToken({ payload: user.id });
};

export default login;
