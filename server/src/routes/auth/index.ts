import { Router } from "express";
import { authController } from "../../controller/auth";
import * as schema from '../../models/auth';
import { validate } from "../../middleware/validator";
import { Auth } from "../../middleware/auth";

export const authRouter = Router()
  .post("/login", validate(schema.login), authController.signIn)
  .post("/create", validate(schema.create), authController.signUp)
  .use(Auth)
  .get("/me", (req, res) => {
    res.status(200).json({
      user: req.user,
    });
  })