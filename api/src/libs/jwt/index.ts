import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { User } from "../../models/user";

export const generateToken = (user: User): string => {
  return jwt.sign(user, config.env.JWT_SECRET);
};

export const verifyToken = (token: string): User => {
  const decoded = jwt.verify(token, config.env.JWT_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Token inválido");
  }

  const { id, username, email } = decoded as Partial<User>;

  if (!id || !username || !email) {
    throw new Error("Dados do token inválidos");
  }

  return { id, username, email };
};
