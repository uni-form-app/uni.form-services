import { Router } from "express";
import { authController } from "../../controller/auth";
import * as schema from '../../models/auth';
import { validate } from "../../middleware/validator";

export const authRouter = Router()
  .post("/login", validate(schema.login), authController.signIn)
  .post("/create", validate(schema.create), authController.signUp)