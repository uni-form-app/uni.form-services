import { Router } from "express";
import { authRouter } from "./auth";
import { Auth } from "../middleware/auth";
import { productRouter } from "./product";
import { partnerRouter } from "./partner";

export const routers = Router()
  .use("/auth", authRouter)
  .use(Auth)
  .use("/products", productRouter)
  .use("/partners", partnerRouter);
