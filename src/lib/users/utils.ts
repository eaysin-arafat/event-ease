import User from "@/models/User";

const userExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return !!user;
};

const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export { findUserByEmail, userExists };
