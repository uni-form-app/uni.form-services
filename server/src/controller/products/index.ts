import { NextFunction, Request, Response } from "express";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: { username, password } } = req;

    // res.status(200).json({ message: "Sign in successful",  });
  } catch (error) {
    next(error);
  }
};

export * as authController from ".";