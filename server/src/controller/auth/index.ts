import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../libs/jwt";
import { authService } from "../../service/auth";
import * as jwt from "../../libs/jwt";

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { username, password } } = req;

    const user = await authService.signIn(username, password);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.generateToken(user);

    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
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