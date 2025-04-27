import { Router } from "express";
import { validate } from "../../middleware/validator";
import * as schema from '../../models/product/schemas';
import { productController } from "../../controller/products";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({
  dest: "uploads/",
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
    cb(null, true);
  },
});

export const productRouter = Router()
  .post(
    "/",
    upload.single("image"),
    validate(schema.create),
    productController.create
  )
  .get("/", validate(schema.get), productController.get)
  .get("/:productId", validate(schema.getUnique), productController.getUnique)
  .put("/:productId", validate(schema.update), productController.update)
  .delete("/:productId", validate(schema.remove), productController.remove)
