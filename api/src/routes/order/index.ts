import { Router } from "express";
import { validate } from "../../middleware/validator";
import * as schema from "../../models/order/schema";
import { orderController } from "../../controller/orders";

export const orderRouter = Router()
  .post("/", validate(schema.create), orderController.create);