import { Router } from "express";
import { authRouter } from "./auth";
import { Auth } from "../middleware/auth";
import { productRouter } from "./product";
import { partnerRouter } from "./partner";
import { orderRouter } from "./order";

export const routers = Router()
  .use("/auth", authRouter)
  .use(Auth)
  .use("/products", productRouter)
  .use("/partners", partnerRouter)
  .use("/orders", orderRouter);
