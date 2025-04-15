import { Router } from "express";
import { authController } from "../../controller/auth";

export const authRouter = Router()
  .post("/login", authController.signIn)
  .post("/create", authController.signUp)
