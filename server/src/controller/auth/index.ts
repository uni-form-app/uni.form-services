import { NextFunction, Response } from "express";
import { generateToken } from "../../libs/jwt";
import { authService } from "../../service/auth";
import * as jwt from "../../libs/jwt";
import { Create, Login } from "../../models/auth";
import { Req } from "../../utils/types";

export const signIn = async (req: Req<Login>, res: Response, next: NextFunction) => {
  try {
    const { body: { username, password } } = req;

    const user = await authService.signIn(username, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.generateToken(user);

    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req: Req<Create>, res: Response, next: NextFunction) => {
  try {
    const { body: { email, password, username } } = req;
    const user = await authService.signUp(email, password, username);

    const token = generateToken(user);

    res.status(201).json({ message: "Sign up successful", token });
  } catch (error) {
    next(error);
  }
};

export * as authController from ".";