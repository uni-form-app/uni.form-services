import { Router } from "express";
import { authRouter } from "./auth";

export const routers = Router()
  .use("/auth", authRouter);
