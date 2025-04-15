import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { User } from "../../models/user";

export const generateToken = (user: User): string => {
  return jwt.sign({ ...user }, config.JWT_SECRET);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}