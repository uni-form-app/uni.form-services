import { userService } from "../user";

export const signIn = async (username: string, password: string) => {
  const user = await userService.getUnique(username);

  if (password !== user.password) {
    throw new Error("Invalid password");
  }

  return user;
}

export const signUp = async (email: string, password: string, username: string) => {
  const user = await userService.create(email, password, username);

  return user;
}

export * as authService from ".";