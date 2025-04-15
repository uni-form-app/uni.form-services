import { NextFunction, Request, Response } from "express";
import { authService } from "../../service/auth";

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { username, password } } = req;

    const user = await authService.signIn(username, password);

    res.status(200).json({ message: "Sign in successful", user });
  } catch (error) {
    next(error);
  }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.signUp(email, password, username);

    res.status(201).json({ message: "Sign up successful", user });
  } catch (error) {
    next(error);
  }
}

export * as authController from ".";