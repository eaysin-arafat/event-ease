import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves to a hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to verify.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
