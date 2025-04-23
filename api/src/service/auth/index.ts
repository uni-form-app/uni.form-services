import { userService } from "../user";
import bcrypt from "bcrypt";

export const signIn = async (username: string, password: string) => {
  const user = await userService.getUnique(username);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return {
    ...user,
    password: undefined,
  };
}

export const signUp = async (email: string, password: string, username: string) => {
  const existingUser = await userService.getUnique(username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.create(email, hashedPassword, username);

  return user;
}

export * as authService from ".";