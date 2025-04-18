import { Router } from "express";
import { validate } from "../../middleware/validator";
import * as schema from '../../models/product/schemas';
import { productController } from "../../controller/products";

export const productRouter = Router()
  .post("/", validate(schema.create), productController.create)
  .get("/", validate(schema.get), productController.get)
  .get("/:productId", validate(schema.getUnique), productController.getUnique)
  .put("/:productId", validate(schema.update), productController.update)
  .delete("/:productId", validate(schema.remove), productController.remove);
