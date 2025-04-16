import { Router } from "express";
import { validate } from "../../middleware/validator";
import * as schema from '../../models/product';
import { productController } from "../../controller/products";

export const productRouter = Router()
  .post("/", validate(schema.create), productController.create)
  .get("/", validate(schema.get), productController.get)
  .get("/:id", productController.getUnique)
  .put("/:id", validate(schema.update), productController.update)
  .delete("/:id", productController.remove);
