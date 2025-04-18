import { Router } from "express";
import { validate } from "../../middleware/validator";
import * as schema from "../../models/partner/schema";
import { partnerController } from "../../controller/partners";

export const partnerRouter = Router()
  .post("/", validate(schema.create), partnerController.create)
  .put("/:partnerId", validate(schema.update), partnerController.update)
  .delete("/:partnerId", validate(schema.exclude), partnerController.remove);
